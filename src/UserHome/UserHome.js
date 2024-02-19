import React, { useState, useRef } from 'react';
import styles from './UserHome.module.css';
import Header from '../tools/Header.js';
import Notch from '../tools/Notch.js';
import BottomBar from '../tools/BottomBar.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import coke from "../images/homeImage/coke.png";
import List from "../images/homeImage/List.png";
import origami from "../images/homeImage/origami.png";

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
    const scrollRef = useRef([]);
    const [selectedNavItem, setSelectedNavItem] = useState(0);

    const handleScroll = (event) => {
        const loss = 115;
        if (window.innerWidth >= 450) {
            var preWidth = 198.5;
            if (Math.abs(event.target.scrollLeft - preWidth * 0) < loss) setSelectedNavItem(0);
            else if (Math.abs(event.target.scrollLeft - preWidth * 1) < loss) setSelectedNavItem(1);
            else if (Math.abs(event.target.scrollLeft - preWidth * 2) < loss) setSelectedNavItem(2);
        } else {
            var semiWidth = (30 + 230 + 20 + 115) - window.innerWidth / 2;
            if (Math.abs(event.target.scrollLeft - semiWidth * 0) < loss) setSelectedNavItem(0);
            else if (Math.abs(event.target.scrollLeft - semiWidth * 1) < loss) setSelectedNavItem(1);
            else if (Math.abs(event.target.scrollLeft - semiWidth * 2) < loss) setSelectedNavItem(2);
        }
    }

    return (
        <div className={styles.content}>
            <p className={styles.title} style={{ fontFamily: 'AbrilFatface' }}>User Home</p>
            <ul className={styles.description} style={{ listStyleType: 'none', display: 'flex', padding: 0 }}>
                <li
                    style={{
                        marginLeft: '30px',
                        marginRight: '30px',
                        color: selectedNavItem === 0 ? '#96DE98' : '#96DE9880',
                    }}
                    onClick={() => {
                        scrollRef.current[0].scrollIntoView({ behavior: 'smooth', inline: 'center' })
                    }}
                >
                    신청·변경
                </li>
                <li
                    style={{
                        marginRight: '30px',
                        color: selectedNavItem === 1 ? '#77D6B4' : '#77D6B480',
                    }}
                    onClick={() => {
                        scrollRef.current[1].scrollIntoView({ behavior: 'smooth', inline: 'center' })
                    }}
                >
                    출결 현황
                </li>
                <li
                    style={{
                        marginRight: '30px',
                        color: selectedNavItem === 2 ? '#96DE98' : '#77D6B480',
                    }}
                    onClick={() => {
                        scrollRef.current[2].scrollIntoView({ behavior: 'smooth', inline: 'center' })
                    }}
                >
                    문의 사항
                </li>
            </ul>
            <ScrollableSection handleScroll={handleScroll}>
                <HorizontalContainer
                    navigate={navigate}
                    onClickPath="/change"
                    image={coke}
                    ref={(ref) => (scrollRef.current[0] = ref)}
                    first={"Join·Edit"} second={"신청·변경"} third={"배드민턴 모임에"} fourth={"참여할 날짜를 선택해주세요"}
                />
                <HorizontalContainer
                    navigate={navigate}
                    onClickPath="/useratt"
                    scolor='#77D6B4'
                    image={List}
                    ref={(ref) => (scrollRef.current[1] = ref)}
                    first={"Join list"} second={"출결 현황"} third={"배드민턴 모임에"} fourth={"출석한 기록을 확인해보세요"}
                />
                <HorizontalContainer
                    navigate={navigate}
                    onClickPath="/inquiry"
                    image={origami}
                    ref={(ref) => (scrollRef.current[2] = ref)}
                    first={"Question"} second={"문의 사항"} third={"하이클리어 동아리에"} fourth={"문의하거나 건의 사항을 남겨주세요"}
                />
            </ScrollableSection>
        </div>
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

    const { state } = useLocation();

    const handleClick = () => {
        if (onClickPath === '/inquiry') {
            alert("준비중입니다!");
        } else {
            navigate(onClickPath, { state: state });
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