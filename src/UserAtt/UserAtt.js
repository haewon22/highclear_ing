import styles from './UserAtt.module.css';
import Header from '../tools/Header.js';
import Notch from '../tools/Notch.js';
import BottomBar from '../tools/BottomBar.js';
import { useEffect, useState } from "react";
import { db } from '../firebase.js';
import { doc, getDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

var datas = [];

function App() {
    return (
      <div>
        <Notch theme='dark'></Notch>
        <Header theme='dark' back={true}></Header>
        <Content></Content>
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  function Content() {
    const { state } = useLocation();
    const [user, setUser] = useState();
    const [y, setY] = useState(0);
    const [n, setN] = useState(0);
  
    async function getUser() {
      const userRef = doc(db, "user", state);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        setUser(userSnap.data());
      }
    };

    async function getDatas() {
        var userRef = doc(db, "user", state);
        var joinRef = collection(userRef, 'join');
        var q = await getDocs(query(joinRef, orderBy('date')));
        q.forEach((doc) => {
            if (doc.data().isChecked === true) setY(y+1);
            if (doc.data().isChecked === false) setN(n+1);
            datas.push(doc.data());
        });
    };

    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  
    const listItems = datas.map((data, index) =>
      <div className={styles.table_item}>
        <p className={`${styles.table_item_text} ${styles.index}`}>{index + 1}</p>
        <p className={`${styles.table_item_text} ${styles.body_day}`}>{data.date.split('-')[1]+"월 "+data.date.split('-')[2]+"일 "+week[new Date(data.date).getDay()]}</p>
        <p className={`${styles.table_item_text} ${styles.status}`} style={{color: data.isChecked == null ? '#000A1350' : data.isChecked ? '#337E3E' : '#FF0000'}}>{data.isChecked == null ? '누락' : data.isChecked ? '출석' : '당일 불참'}</p>
      </div>
    );
  
    useEffect(() => {
      datas = [];
      getUser();
      getDatas();
    }, []);
  
    return (
      <div className={styles.content}>
        <p className={styles.title}>출결 현황</p>
        { user !== undefined &&
        <p className={styles.description}>
          <span style={{color: '#77D6B4'}}>{user.name}</span>님의<br></br>
          인정 출석은 <span style={{color: '#96DE98'}}>{y}회</span><br></br>
          누적 경고 횟수는 <span style={{color: '#96DE98'}}>{n}회</span> 입니다
        </p> }
        <div className={styles.table}>
          <div className={styles.table_background}>
            {listItems}
          </div>
          <div className={styles.table_header}>
            <p className={`${styles.table_header_text} ${styles.header_day}`}>날짜</p>
            <p className={`${styles.table_header_text} ${styles.yn}`}>출석 여부</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default App;