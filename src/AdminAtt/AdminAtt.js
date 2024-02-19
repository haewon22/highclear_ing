import styles from './AdminAtt.module.css';
import Header from '../tools/Header.js';
import Notch from '../tools/Notch.js';
import BottomBar from '../tools/BottomBar.js';
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

function AdminAtt() {
    return (
        <div>
            <Notch theme='dark'></Notch>
            <Header theme='dark' back={true}></Header>
            <Content2></Content2>
            <BottomBar></BottomBar>
        </div>
    );
}

function Content2() {
    const datas = [
        { name: '강효인', green: 8, red: 0 },
        { name: '김민성', green: 2, red: 3 },
        { name: '김건호', green: 8, red: 0 },
        { name: '정해원', green: 6, red: 2 },
        { name: '최예진', green: 8, red: 0 },
        { name: '홍길동', green: 4, red: 1 },
        { name: '이철수', green: 3, red: 0 },
        { name: '김영희', green: 1, red: 2 },
        { name: '손흥민', green: 8, red: 0 },
        { name: '김민재', green: 8, red: 0 },
        { name: '이강인', green: 8, red: 0 },
        { name: '봉준호', green: 8, red: 0 },
        { name: '김제니', green: 8, red: 0 },
        { name: '김지수', green: 8, red: 0 },
    ];

    const listItems = datas.map((data, index) =>
        <div className={styles.table_item}>
            <p className={`${styles.table_item_text} ${styles.index}`}>{index + 1}</p>
            <p className={`${styles.table_item_text} ${styles.body_name}`}>{data.name}</p>
            <p className={`${styles.table_item_text} ${styles.body_green}`} style={{ color: '#337E3E' }}>{data.green + '회'}</p>
            <p className={`${styles.table_item_text} ${styles.body_red}`} style={{ color: 'red' }}>{data.red + '회'}</p>
            <div className={styles.body_icon}><FontAwesomeIcon icon={faChevronRight} size="2xs" /></div>
        </div>
    );

    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });

    return (
        <div className={styles.content}>
            <p className={styles.title}>출결표</p>
            <div className={`${styles.table} ${styles.table2}`}>
                <div className={`${styles.table_background} ${styles.table2_background}`} ref={scrollRef}>
                    {listItems}
                </div>
                <div className={styles.table_header}>
                    <p className={`${styles.table_header_text} ${styles.header_name}`}>이름</p>
                    <p className={`${styles.table_header_text} ${styles.header_green}`}>인정 출석</p>
                    <p className={`${styles.table_header_text} ${styles.header_red}`}>경고</p>
                </div>
            </div>
        </div>
    );
}

export default AdminAtt;