import styles from './Change.module.css';
import Header from '../tools/Header.js';
import Notch from '../tools/Notch.js';
import BottomBar from '../tools/BottomBar.js';
import ManagePlan from './ManagePlan/ManagePlan.js';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { db } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';

function Change() {
    const { state } = useLocation();
    const [name, setName] = useState();
    async function getName() {
        const nameRef = doc(db, "user", state);
        const nameSnap = await getDoc(nameRef);
        setName(nameSnap.data().name);
    };
    useEffect(() => {
        getName();
    });
    return (
        <div>
            <Notch theme='dark'></Notch>
            <Header theme='dark' back={true}></Header>
            <Content name={name}></Content>
            <Box name={name} uid={state}></Box>
            <BottomBar></BottomBar>
        </div>
    );
}

function Content(props) {
    return (
        <div className={styles.content}>
            <p className={styles.title}>신청·변경</p>
            <p className={styles.description}>
                <span style={{ color: '#77D6B4' }}>{props.name}</span>님,<br></br>
                <div style={{ fontSize: '20px' }}>
                    <span style={{ color: '#96DE98' }}>당일 신청·변경은 불가능</span>하고<br></br>
                    <div style={{ lineHeight: '32px' }}>
                        <span style={{ color: '#96DE98' }}>전날까지 신청·변경 가능</span>합니다
                    </div>
                </div>
            </p>
        </div>
    );
}

function Box(props){
    var now=dayjs();
    now.format();
    const [std, setStd]=useState(now);
    const [check, setCheck]=useState(false);
  
    if((!check)&&now.get("d")!==0){
      var i=0;
      while(std.subtract(i,"day").get("d")!==0){i++}
      setStd(std.subtract(i,"day"))
      setCheck(true)
    }
    //일요일 기준으로 월~금 세팅
    //현재 리렌더링 과다방지 위해 토->일 넘어갈 때 새로고침 필요함
    return(
      <>
        <ManagePlan uid={props.uid} name={props.name} p={std} day={'Mon'}/>
        <ManagePlan uid={props.uid} name={props.name} p={std} day={'Tue'}/>
        <ManagePlan uid={props.uid} name={props.name} p={std} day={'Wed'}/>
        <ManagePlan uid={props.uid} name={props.name} p={std} day={'Thu'}/>
        <ManagePlan uid={props.uid} name={props.name} p={std} day={'Fri'}/>
      </>
    );
  }
  
export default Change;