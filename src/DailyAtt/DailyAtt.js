import styles from './DailyAtt.module.css';
import Header from '../tools/Header.js';
import Notch from '../tools/Notch.js';
import BottomBar from '../tools/BottomBar.js';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase.js';
import { collection, onSnapshot, getDoc, getDocs, query, doc, updateDoc} from 'firebase/firestore';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

function ModifyAtt() {
    const [currentPage, setCurrentPage] = useState(false);
    const handleBackButtonClick = () => {
        setCurrentPage(!currentPage);
    };

    return (
        <div>
            <Notch theme='dark'></Notch>
            <Header theme='dark' back={true} onBackClick={handleBackButtonClick}></Header>
            <Content2></Content2>
            <BottomBar></BottomBar>
        </div>
    );
}

dayjs.locale('ko');

const now = dayjs();
const year = now.year();
const month = now.month() + 1;
const date = now.date();
const dayOfWeek = now.format('dddd');

const buttonY1_rec_Style = {
    color: '#FFFFFF00',
    background: 'linear-gradient(0deg, transparent, transparent), linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))',
    border: '1px solid #337E3E',
    width: '45px',
    height: '25px',
    borderRadius: '15px',
    position: 'absolute'
  };
  
  const buttonN1_rec_Style = {...buttonY1_rec_Style, 
    background: 'linear-gradient(0deg, transparent, transparent), linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))',
    border: '1px solid #FF0000'};
  
  const buttonY2_rec_Style = {...buttonY1_rec_Style, background: '#337E3E'};
  const buttonN2_rec_Style = {...buttonN1_rec_Style, background: '#FF0000'};
  
  function Content2() {
  
    const [datas, setDatas] = useState([]);
  
    useEffect(() => {
      const fetchUsersAndJoinData = async () => {
        const attendacneDate = `${year}-${month}-${date}`;
        const users = [];
        const q = query(collection(db, "user"));
        const querySnapshot = await getDocs(q);
  
        const attendanceRef = doc(db, `attendance/${attendacneDate}`);
        const attendanceSnap = await getDoc(attendanceRef);
        let userList = [];
        if (attendanceSnap.exists()) {
          userList = attendanceSnap.data().nuidlist || [];
        }
  
        for (const doc of querySnapshot.docs) {
          if (userList.includes(doc.id)) {
            const userData = { name: doc.data().name, uuid: doc.id, joinid: [], late: [], isChecked: [] };
            
            const joinCollectionRef = collection(db, `user/${doc.id}/join`);
            const joinSnapshot = await getDocs(joinCollectionRef);
  
            joinSnapshot.forEach((joinDoc) => {
              if (joinDoc.data().date === attendacneDate) {
              userData.joinid.push(joinDoc.id)
              if (joinDoc.data().late !== 0 && joinDoc.data().late) {
                userData.late.push("늦참 "+joinDoc.data().late+"분");
              }
              userData.isChecked = joinDoc.data().isChecked;  
            }      
            });
            users.push(userData);
          }
        }
        setDatas(users);
      };
      fetchUsersAndJoinData();
    }, []);
  
  const handleYButtonClick = async (userId, joinDocId) => {
    const joinDocRef = doc(db, `user/${userId}/join/${joinDocId}`);
    const currentUser = datas.find(data => data.uuid === userId);
    if (!currentUser) {
        console.error("User not found");
        return;
    }
    try {
        await updateDoc(joinDocRef, {
            isChecked: currentUser.isChecked === true ? null : true
        });
  
        const updatedDatas = datas.map(data => {
            if (data.uuid === userId) {
                return { ...data, isChecked: currentUser.isChecked === true ? null : true };
            }
            return data;
        });
        setDatas(updatedDatas);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
  };
  
  const handleNButtonClick = async (userId, joinDocId) => {
    const joinDocRef = doc(db, `user/${userId}/join/${joinDocId}`);
    const currentUser = datas.find(data => data.uuid === userId);
    if (!currentUser) {
        console.error("User not found");
        return;
    }
    try {
        await updateDoc(joinDocRef, {
            isChecked: currentUser.isChecked === false ? null : false
        });
  
        const updatedDatas = datas.map(data => {
            if (data.uuid === userId) {
                return { ...data, isChecked: currentUser.isChecked === false ? null : false };
            }
            return data;
        });
        setDatas(updatedDatas);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
  };
  
    const listItems = datas.map((data, index) =>
    <div key={index} className={styles.table_item}>
      <p className={`${styles.table_item_text} ${styles.index}`}>{index + 1}</p>
      <p className={`${styles.table_item_text} ${styles.body_name}`}>{data.name}</p>
      <p className={`${styles.table_item_text} ${styles.body_late}`}>{data.late}</p>
      <div className={`${styles.table_item} ${styles.status1}`}>
        <button 
          onClick={() => handleYButtonClick(data.uuid, data.joinid)}
          style={data.isChecked === null ? buttonY1_rec_Style : data.isChecked ? buttonY2_rec_Style : buttonY1_rec_Style}>
        </button>
      </div>
      <div className={`${styles.table_item} ${styles.status2}`}>
        <button
          onClick={() => handleNButtonClick(data.uuid, data.joinid)}
          style={data.isChecked === null ? buttonN1_rec_Style : data.isChecked ? buttonN1_rec_Style : buttonN2_rec_Style}>
        </button>
      </div>
      <p className={`${styles.table_item_text} ${styles.textstatus1}`} style={{color: data.isChecked == null ? '#337E3E' : data.isChecked ? '#FFFFFF' : '#337E3E'}}>
        출석</p>      
      <p className={`${styles.table_item_text} ${styles.textstatus2}`} style={{color: data.isChecked == null ? '#FF0000' : data.isChecked ? '#FF0000' : '#FFFFFF'}}>
        불참</p>
    </div>
  );
  
    return (
      <div className={styles.content}>
        <p className={styles.title}>당일 출석 체크</p>
        <p className={styles.description}>
          <span style={{color: '#96DE98'}}>{month}월 {date}일 {dayOfWeek}</span>
        </p>
        <div className={styles.table}>
          <div className={styles.table_background2}>
            {listItems}
          </div>
          <div className={styles.table_header}>
            <p className={`${styles.table_header_text} ${styles.header_name}`}>이름</p>
            <p className={`${styles.table_header_text} ${styles.header_late}`}>늦참 여부</p>
            <p className={`${styles.table_header_text} ${styles.yn}`}>출석 여부</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default ModifyAtt;