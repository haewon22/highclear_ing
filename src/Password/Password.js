import React, { useState } from 'react';
import styles from './Password.module.css';
import Header from '../tools/Header.js';
import Notch from '../tools/Notch.js';
import BottomBar from '../tools/BottomBar.js';

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
    const userPW = "00000";
    const adminPW = "00001";

    const [userPassword, setUserPassword] = useState(userPW);
    const [adminPassword, setAdminPassword] = useState(adminPW);
    const [userInput, setUserInput] = useState('');
    const [adminInput, setAdminInput] = useState('');

    const handleUserPasswordChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleAdminPasswordChange = (event) => {
        setAdminInput(event.target.value);
    };

    const handleUserPasswordSubmit = () => {
        setUserPassword(userInput);
        setUserInput('');
    };

    const handleAdminPasswordSubmit = () => {
        setAdminPassword(adminInput);
        setAdminInput('');
    };

    return (
        <div className={styles.content}>
            <p className={styles.title}>패스워드 변경</p>
            <p className={styles.description}>
                현재<br></br>
                <span style={{ color: '#77D6B4' }}>유저 비밀번호</span>는
                <span style={{ color: '#96DE98' }}>{userPassword}</span><br></br>
                <span style={{ color: '#96DE98' }}>관리자 비밀번호</span>는
                <span style={{ color: '#96DE98' }}>{adminPassword}</span> 입니다
            </p>
            <input
                className={styles.formField}
                type="password"   // number 논의 필요
                id="userPassword"
                value={userInput}
                onChange={handleUserPasswordChange}
                placeholder='유저 비밀번호'
                maxLength={5}  // 5글자로 제한
            />
            <button className={styles.submitButton}
                style={{ backgroundColor: '#96DE98' }}
                onClick={handleUserPasswordSubmit}>유저 비밀번호 변경</button>
            <input
                className={styles.formField}
                type="password"
                id="adminPassword"
                value={adminInput}
                onChange={handleAdminPasswordChange}
                placeholder='관리자 비밀번호'
                maxLength={5}
            />
            <button className={styles.submitButton}
                style={{ backgroundColor: '#77D6B4' }}
                onClick={handleAdminPasswordSubmit}>관리자 비밀번호 변경</button>
        </div >
    );
}

export default App;
