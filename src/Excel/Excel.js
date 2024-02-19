import React, { useState } from 'react';
import styles from './Excel.module.css';
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
    const [userInput, setUserInput] = useState('');
    const [adminInput, setAdminInput] = useState('');

    const handleSpreadSheetAlready = (event) => {
        setUserInput(event.target.value);
    };

    const handleSpreadSheet = (event) => {
        setAdminInput(event.target.value);
    };

    const handleSpreadSheetAlreadySubmit = () => {
        setUserInput(userInput);
        setUserInput('');
    };

    const handleSpreadSheetSubmit = () => {
        setAdminInput(adminInput);
        setAdminInput('');
    };

    return (
        <div className={styles.content}>
            <p className={styles.title}>엑셀 연동</p>
            <p className={styles.description}>
                현재<br></br>
                <span style={{ color: '#77D6B4' }}>구글 </span>
                <span style={{ color: '#96DE98' }}>스프레드시트</span>와<br></br>
                연동하고 있습니다
            </p>
            <input
                className={styles.formField}
                type="text"
                id="userPassword"
                value={userInput}
                onChange={handleSpreadSheetAlready}
                placeholder='스프레드시트 주소'
            />
            <button className={styles.submitButton}
                style={{ backgroundColor: '#77D6B4', marginBottom: '10px' }}
                onClick={handleSpreadSheetAlreadySubmit}>스프레드시트 주소 변경</button>

            <p className={styles.description}>
                현재<br></br>
                연동되어 있지 않습니다
            </p>

            <input
                className={styles.formField}
                type="text"
                id="adminPassword"
                value={adminInput}
                onChange={handleSpreadSheet}
                placeholder='스프레드시트 주소'
            />
            <button className={styles.submitButton}
                style={{ backgroundColor: '#77D6B4' }}
                onClick={handleSpreadSheetSubmit}>스프레드시트 주소 변경</button>
        </div >
    );
}

export default App;
