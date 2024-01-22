import './App.css';
import Header from './tools/Header.js';
import Notch from './tools/Notch.js';
import BottomBar from './tools/BottomBar.js';

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
  return (
    <div className='content'>
      <p className='title'>출결 현황</p>
      {/* 주석 지정 : Ctrl + K + C / 주석 해제 : Ctrl + K + U */}
      {/* <div className='figure'>도형은 margin-top 28px 부터 시작</div> */}
      <p className='description'>
        <span style={{color: '#77D6B4'}}>정해원</span>님의<br></br>
        인정 출석은 <span style={{color: '#96DE98'}}>8회</span><br></br>
        누적 경고 횟수는 <span style={{color: '#96DE98'}}>1회</span> 입니다
      </p>
    </div>
  );
}

export default App;
