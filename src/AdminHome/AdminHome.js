import React, { useState, useRef } from 'react';
import styles from './AdminHome.module.css';
import Header from '../tools/Header.js';
import Notch from '../tools/Notch.js';
import BottomBar from '../tools/BottomBar.js';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import coke from "../images/homeImage/coke.png";
import List from "../images/homeImage/List.png";
import origami from "../images/homeImage/origami.png";
import check from "../images/homeImage/check.png";
import excel from "../images/homeImage/excel.png";

function App() {
    return (
        <div>
            <Content></Content>
            <LogoutButton />
            <Header theme='dark' back={false}></Header>
            <BottomBar></BottomBar>
            <Notch theme='dark'></Notch>
        </div >
    );
}

function Content() {
    const navigate = useNavigate();
    const startRef = useRef(null);
    const endRef = useRef(null);
    const scrollRef = useRef([]);
    const [selectedNavItem, setSelectedNavItem] = useState(0);

    const handleScroll = (event) => {
        const loss = 115;
        const Width = 250;
        const preWidth = window.innerWidth >= 450 ? 198.5 : (30 + 230 + 20 + 115) - window.innerWidth / 2;
        if (Math.abs(event.target.scrollLeft - preWidth * 0 - Width * 0) < loss) {
            setSelectedNavItem(0);
            if (Math.abs(event.target.scrollLeft - preWidth * 0 - Width * 0) <= 0.5) startRef.current.scrollIntoView({ inline: 'center' });
        }
        else if (Math.abs(event.target.scrollLeft - preWidth * 1 - Width * 0) < loss) {
            setSelectedNavItem(1);
            if (Math.abs(event.target.scrollLeft - preWidth * 1 - Width * 0) <= 0.5) startRef.current.scrollIntoView({ inline: 'center' });
        }
        else if (Math.abs(event.target.scrollLeft - preWidth * 1 - Width * 1) < loss) {
            setSelectedNavItem(2);
            if (Math.abs(event.target.scrollLeft - preWidth * 1 - Width * 1) <= 0.5) startRef.current.scrollIntoView({ inline: 'center' });
        }
        else if (Math.abs(event.target.scrollLeft - preWidth * 1 - Width * 2) < loss) {
            setSelectedNavItem(3);
            if (Math.abs(event.target.scrollLeft - preWidth * 1 - Width * 2) <= 0.5) endRef.current.scrollIntoView({ inline: 'center' });
        }
        else if (Math.abs(event.target.scrollLeft - preWidth * 1 - Width * 3) < loss) {
            setSelectedNavItem(4);
            if (Math.abs(event.target.scrollLeft - preWidth * 1 - Width * 3) <= 0.5) endRef.current.scrollIntoView({ inline: 'center' });
        }
        else if (Math.abs(event.target.scrollLeft - preWidth * 2 - Width * 3) < loss) {
            setSelectedNavItem(5);
            if (Math.abs(event.target.scrollLeft - preWidth * 2 - Width * 3) <= 0.5) endRef.current.scrollIntoView({ inline: 'center' });
        }
    }

    return (
        <div className={styles.content}>
            <p className={styles.title} style={{ fontFamily: 'AbrilFatface' }}>Admin Home</p>
            <ul className={styles.description} style={{ listStyleType: 'none', display: 'flex', padding: 0 }}>
                <li
                    ref={startRef}
                    style={{
                        marginRight: '30px',
                        marginLeft: '30px',
                        color: selectedNavItem === 0 ? '#77D6B4' : '#77D6B480',
                    }}
                    onClick={() => {
                        scrollRef.current[0].scrollIntoView({ behavior: 'smooth', inline: 'center' })
                    }}
                >
                    당일 출석 체크
                </li>
                <li
                    style={{
                        marginRight: '30px',
                        color: selectedNavItem === 1 ? '#96DE98' : '#77D6B480',
                    }}
                    onClick={() => {
                        scrollRef.current[1].scrollIntoView({ behavior: 'smooth', inline: 'center' })
                    }}
                >
                    출결표
                </li>
                <li
                    style={{
                        marginRight: '30px',
                        color: selectedNavItem === 2 ? '#77D6B4' : '#77D6B480',
                    }}
                    onClick={() => {
                        scrollRef.current[2].scrollIntoView({ behavior: 'smooth', inline: 'center' });
                    }}
                >
                    셔틀콕 관리
                </li>
                <li
                    style={{
                        marginRight: '30px',
                        color: selectedNavItem === 3 ? '#96DE98' : '#77D6B480',
                    }}
                    onClick={() => {
                        scrollRef.current[3].scrollIntoView({ behavior: 'smooth', inline: 'center' });
                    }}
                >
                    문의 사항
                </li>
                <li
                    style={{
                        marginRight: '30px',
                        color: selectedNavItem === 4 ? '#77D6B4' : '#77D6B480',
                    }}
                    onClick={() => {
                        scrollRef.current[4].scrollIntoView({ behavior: 'smooth', inline: 'center' })
                    }}
                >
                    패스워드 변경
                </li>
                <li
                    ref={endRef}
                    style={{
                        paddingRight: '30px',
                        color: selectedNavItem === 5 ? '#96DE98' : '#77D6B480',
                    }}
                    onClick={() => {
                        scrollRef.current[5].scrollIntoView({ behavior: 'smooth', inline: 'center' })
                    }}
                >
                    엑셀 연동
                </li>
            </ul>
            <ScrollableSection handleScroll={handleScroll}>
                <HorizontalContainer
                    navigate={navigate}
                    onClickPath="/dailyatt"
                    scolor='#77D6B4'
                    image={check}
                    ref={(ref) => (scrollRef.current[0] = ref)}
                    first={"Attendance"} second={"당일 출석 체크"} third={"당일 배드민턴 모임에서"} fourth={"부원의 출석을 체크하세요"}
                />
                <HorizontalContainer
                    navigate={navigate}
                    onClickPath="/adminatt"
                    image={List}
                    ref={(ref) => (scrollRef.current[1] = ref)}
                    first={"Roll book"} second={"출결표"} third={"하이클리어 부원들의"} fourth={"출석과 경고 횟수를 확인하세요"}
                />
                <HorizontalContainer
                    navigate={navigate}
                    onClickPath="/shuttlecock"
                    scolor='#77D6B4'
                    image={coke}
                    ref={(ref) => (scrollRef.current[2] = ref)}
                    first={"Shuttlecock"} second={"셔틀콕 관리"} third={"추가되는 셔틀콕을 입력하고"} fourth={"사용 후 남은 셔틀콕을 확인하세요"}
                />
                <HorizontalContainer
                    navigate={navigate}
                    onClickPath="/inquiry"
                    image={origami}
                    ref={(ref) => (scrollRef.current[3] = ref)}
                    first={"Question"} second={"문의 사항"} third={"부원들이 동아리에"} fourth={"문의한 내용을 확인하세요"}
                />
                <HorizontalContainer
                    navigate={navigate}
                    onClickPath="/password"
                    scolor='#77D6B4'
                    image={origami}
                    ref={(ref) => (scrollRef.current[4] = ref)}
                    first={"Password"} second={"패스워드 변경"} third={"하이클리어 웹사이트의"} fourth={"로그인 비밀번호를 변경하세요"}
                />
                <HorizontalContainer
                    navigate={navigate}
                    onClickPath="/excel"
                    image={excel}
                    ref={(ref) => (scrollRef.current[5] = ref)}
                    first={"Spreadsheet"} second={"엑셀 연동"} third={"하이클리어 웹사이트와"} fourth={"스프레드시트를 연동하세요"}
                />
            </ScrollableSection>
        </div >
    );
}

const ScrollableSection = ({ children, handleScroll }) => {
    return (
        <div className={styles.scrollableSection} onScroll={handleScroll}>
            {children}
        </div>
    );
};

const HorizontalContainer = React.forwardRef(({ navigate, onClickPath, scolor, image, first, second, third, fourth }, ref) => {

    const handleClick = () => {
        if (onClickPath === '/password' || onClickPath === '/adminatt' || onClickPath === '/shuttlecock' || onClickPath === '/inquiry' || onClickPath === '/excel') {
            alert("준비중입니다!");
        } else {
            navigate(onClickPath);
        }
    };

    const containerStyle = {
        flexShrink: 0,
        scrollSnapAlign: 'start',
        backgroundColor: scolor || '#96DE98',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        width: '230px',
        height: '450px',
        borderRadius: '115px',
        marginLeft: '20px',
    };

    const imageContainerStyle = {
        height: '160px',
        justifyContent: 'center',
        marginBottom: '20px',
        display: 'flex',
    };

    const listStyle = {
        listStyleType: 'none',
        paddingLeft: 0,
        marginTop: '20px',
        marginBottom: '20px',
        textAlign: 'start',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '30px',
    };

    const liStyle = {
        marginTop: '5px',
    };

    return (
        <div ref={ref} className='horizontal-container' style={containerStyle} onClick={handleClick}>
            <div className='image-container' style={imageContainerStyle}>
                <img src={image} style={{ width: '80%', height: '110%', objectFit: 'contain' }} alt="container" />
            </div>
            <ul style={listStyle}>
                <li style={{ fontWeight: 700, fontSize: '16px', lineHeight: '16px', color: '#337E3E', ...liStyle }}>{first}</li>
                <li style={{ fontWeight: 900, fontSize: '26px', lineHeight: '37.65px', color: '#FFFFFF', ...liStyle }}>{second}</li>
                <li style={{ fontWeight: 400, fontSize: '12px', lineHeight: '17.38px', color: '#337E3E', ...liStyle }}>{third}</li>
                <li style={{ fontWeight: 400, fontSize: '12px', lineHeight: '17.38px', color: '#337E3E', ...liStyle }}>{fourth}</li>
            </ul>
        </div>
    );
});

function LogoutButton() {
    const navigate = useNavigate();
    const buttonStyle = {
        position: 'absolute',
        bottom: '30px',
        width: '120px',
        height: '50px',
        left: '30px',
        border: 'transparent',
        borderRadius: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '15px',
    };

    const textStyle = {
        fontSize: '16px',
        fontWeight: '700',
        lineHeight: '23.17px',
        color: '#000A13',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <button style={buttonStyle} onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faArrowLeft} size="lg" style={{ color: "#000A13" }} />
            <span style={textStyle}>Logout</span>
        </button>
    );
}

export default App;