import styles from './ModifyAtt.module.css';
import Header from '../tools/Header.js';
import Notch from '../tools/Notch.js';
import BottomBar from '../tools/BottomBar.js';
import React, { useState } from 'react';

function DailyAtt() {
    const [currentPage, setCurrentPage] = useState(false);
    const handleBackButtonClick = () => {
        setCurrentPage(!currentPage);
    };

    return (
        <div>
            <Notch theme='dark'></Notch>
            <Header theme='dark' back={true} onBackClick={handleBackButtonClick}></Header>
            <Content></Content>
            <BottomBar></BottomBar>
        </div>
    );
}

const buttonY1_text_Style = {
    color: '#337E3E',
    fontFamily: 'Noto Sans KR',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '17.38px',
    letterSpacing: '0em',
    textAlign: 'center',
    height: '17px',
    top: '66px',
    left: '225px',
    position: 'absolute'
};

const buttonN1_text_Style = { ...buttonY1_text_Style, color: '#FF0000', left: '280px' };

const buttonY1_rec_Style = {
    color: '#FFFFFF00',
    background: 'linear-gradient(0deg, transparent, transparent), linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))',
    border: '1px solid #337E3E',
    width: '45px',
    height: '25px',
    top: '63px',
    left: '214px',
    borderRadius: '15px',
    position: 'absolute'
};

const buttonN1_rec_Style = {
    ...buttonY1_rec_Style,
    background: 'linear-gradient(0deg, transparent, transparent), linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))',
    border: '1px solid #FF0000', left: '269px'
};

// 버튼을 누르면 buttonY2로 변경
const buttonY2_text_Style = { ...buttonY1_text_Style, color: '#FFFFFF' };
const buttonY2_rec_Style = { ...buttonY1_rec_Style, background: '#337E3E' };
const buttonN2_text_Style = { ...buttonN1_text_Style, color: '#FFFFFF' };
const buttonN2_rec_Style = { ...buttonN1_rec_Style, background: '#FF0000' };

const spanStyle = {
    color: '#FFFFFF',
    fontFamily: 'Noto Sans KR',
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '21.72px',
    letterSpacing: '0em',
    textAlign: 'center',
    position: 'absolute'
};

const numberStyle = {
    color: '#000A1380',
    fontFamily: 'Noto Sans KR',
    fontSize: '10px',
    fontWeight: 400,
    lineHeight: '14.48px',
    letterSpacing: '0em',
    textAlign: 'center',
    height: '14px',
    top: '68px',
    left: '15px',
    position: 'absolute'
};

const dayStyle = {
    color: '#000A13',
    fontFamily: 'Noto Sans KR',
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '21.72px',
    letterSpacing: '0em',
    textAlign: 'left',
    height: '22px',
    top: '63px',
    left: '70px',
    position: 'absolute'
};

const timeStyle = {
    color: '#000A13',
    fontFamily: 'Noto Sans KR',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '17.38px',
    letterSpacing: '0em',
    textAlign: 'center',
    height: '17px',
    top: '65px',
    left: '129px',
    position: 'absolute'
};

function Content() {
    const [clickY, setClickY] = useState(Array(16).fill(false));
    const [clickN, setClickN] = useState(Array(16).fill(false));
    const handleButtonClickY = (index) => {
        setClickY((prevClickStates) => {
            const newClickStates = [...prevClickStates];
            newClickStates[index] = !newClickStates[index];
            return newClickStates;
        });
        setClickN((prevClickStates) => {
            const newClickStates = [...prevClickStates];
            newClickStates[index] = false; // Y가 활성화되면 N을 비활성화
            return newClickStates;
        });
    }
    const handleButtonClickN = (index) => {
        setClickN((prevClickStates) => {
            const newClickStates = [...prevClickStates];
            newClickStates[index] = !newClickStates[index];
            return newClickStates;
        });
        setClickY((prevClickStates) => {
            const newClickStates = [...prevClickStates];
            newClickStates[index] = false; // N이 활성화되면 Y를 비활성화
            return newClickStates;
        });
    }
    const items = Array.from({ length: 16 }, (_, index) => index + 1);
    const day = ['1월 1일 월요일', '1월 2일 화요일', '1월 3일 수요일', '1월 4일 목요일', '1월 8일 월요일', '1월 9일 화요일', '1월 10일 수요일', '1월 11일 목요일', '1월 15일 월요일', '1월 16일 화요일', '1월 17일 수요일', '1월 18일 목요일', '1월 22일 월요일', '1월 23일 화요일', '1월 24일 수요일', '1월 25일 목요일'];
    const combinedData = items.map((item, index) => ({
        number: item,
        day: day[index],
        clickY: clickY[index],
        clickN: clickN[index]
    }));
    const tableItems = combinedData.map((item, index) => (
        <div key={index} className={styles.table_item}>
            <span style={{ ...numberStyle, top: `${68 + index * 50}px` }}>{item.number}</span>
            <span style={{ ...dayStyle, top: `${63 + index * 50}px` }}>{item.day}</span>
            <div>
                <button
                    style={{ ...item.clickY ? buttonY2_rec_Style : buttonY1_rec_Style, top: `${63 + index * 50}px` }}
                    onClick={() => handleButtonClickY(index)}>
                </button>
                <span
                    style={{ ...item.clickY ? buttonY2_text_Style : buttonY1_text_Style, top: `${66 + index * 50}px` }}
                    onClick={() => handleButtonClickY(index)}>출석
                </span>
                <button
                    style={{ ...item.clickN ? buttonN2_rec_Style : buttonN1_rec_Style, top: `${63 + index * 50}px` }}
                    onClick={() => handleButtonClickN(index)}>
                </button>
                <span
                    style={{ ...item.clickN ? buttonN2_text_Style : buttonN1_text_Style, top: `${66 + index * 50}px` }}
                    onClick={() => handleButtonClickN(index)}>불참
                </span>
            </div>
        </div>
    ));

    return (
        <div className={styles.content}>
            <p className={styles.title}>출결 수정</p>
            <p className={styles.description}>
                <span style={{ color: '#77D6B4' }}>정해원</span>님의<br></br>
                인정 출석은 <span style={{ color: '#96DE98' }}>8회</span><br></br>
                누적 경고 횟수는 <span style={{ color: '#96DE98' }}>1회</span> 입니다
            </p>
            <div className={styles.table}>
                <div className={styles.table_background}>
                    {tableItems}
                </div>
                <div className={styles.table_header}>
                    <span style={{ ...spanStyle, height: '22px', top: '13px', left: '70px' }}>날짜</span>
                    <span style={{ ...spanStyle, height: '22px', top: '13px', left: '234px' }}>출석 여부</span>
                </div>
            </div>
        </div>
    );
}



export default DailyAtt;