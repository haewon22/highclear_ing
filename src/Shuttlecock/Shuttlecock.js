import styles from './Shuttlecock.module.css';
import Header from '../tools/Header.js';
import Notch from '../tools/Notch.js';
import BottomBar from '../tools/BottomBar.js';
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

function Shuttlecock() {
    return (
        <div>
            <Notch theme='dark'></Notch>
            <Header theme='dark' back={true}></Header>
            <Content3></Content3>
            <BottomBar></BottomBar>
        </div>
    );
}

function Content3() {
    const datas = [
        { day: '1월 1일 월요일', num: 100, remain: 100 },
        { day: '1월 1일 월요일', num: -5, remain: 95 },
        { day: '1월 2일 화요일', num: -2, remain: 93 },
        { day: '1월 3일 수요일', num: -7, remain: 86 },
        { day: '1월 4일 목요일', num: -8, remain: 78 },
        { day: '1월 5일 금요일', num: -2, remain: 76 },
        { day: '1월 6일 토요일', num: -5, remain: 71 },
        { day: '1월 7일 일요일', num: -6, remain: 65 },
        { day: '1월 8일 월요일', num: -6, remain: 59 },
        { day: '1월 9일 화요일', num: -6, remain: 53 },
        { day: '1월 10일 수요일', num: -10, remain: 43 },
        { day: '1월 11일 목요일', num: -7, remain: 36 },
        { day: '1월 12일 금요일', num: -8, remain: 28 },
        { day: '1월 13일 토요일', num: -9, remain: 19 },
        { day: '1월 14일 일요일', num: -3, remain: 17 },
    ];

    const listItems = datas.map((data, index) =>
        <div className={styles.table_item}>
            <p className={`${styles.table_item_text} ${styles.index}`}>{index + 1}</p>
            <p className={`${styles.table_item_text} ${styles.body_day}`}>{data.day}</p>
            <p className={`${styles.table_item_text} ${styles.body_num}`} style={{ color: data.num >= 0 ? 'red' : 'blue' }}>{data.num >= 0 ? `+${data.num}` : data.num}</p>
            <p className={`${styles.table_item_text} ${styles.body_remain}`}>{`${data.remain}개`}</p>
        </div>
    );

    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });

    return (
        <div className={styles.content}>
            <p className={styles.title}>셔틀콕 관리</p>
            <div className={`${styles.table} ${styles.table3}`}>
                <div className={`${styles.table_background} ${styles.table3_background}`} ref={scrollRef}>
                    {listItems}
                </div>
                <div className={styles.table_header}>
                    <p className={`${styles.table_header_text} ${styles.header_day}`}>날짜</p>
                    <p className={`${styles.table_header_text} ${styles.header_num}`}>사용</p>
                    <p className={`${styles.table_header_text} ${styles.header_remain}`}>잔여</p>
                </div>
            </div>
            <div className={styles.form}>
                <div className={`${styles.form_div} ${styles.add}`}>
                    <span className={styles.prefix}>추가 :</span>
                    <input type='text' className={styles.form_input}></input>
                    <div className={styles.button} style={{ background: 'red' }}>
                        <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: "#ffffff" }} />
                    </div>
                </div>
                <div className={`${styles.form_div} ${styles.sub}`}>
                    <span className={styles.prefix}>사용 :</span>
                    <input type='text' className={styles.form_input}></input>
                    <div className={styles.button} style={{ background: 'blue' }}>
                        <FontAwesomeIcon icon={faMinus} size="lg" style={{ color: "#ffffff" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shuttlecock;
