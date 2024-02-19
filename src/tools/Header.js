import './Header.css';
import { ReactComponent as Image } from '../images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

function Header({ onBackClick, theme, back }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <header style={{ background: 'linear-gradient(' + (theme === 'dark' ? '#000A13' : '#77D6B4') + ' 60%, transparent)' }}>
        {back ? <Back onBackClick={handleBackClick}></Back> : <div></div>}
        <Logo theme={theme}></Logo>
      </header>
    </div>
  );
}

function Logo({ theme }) {
  return (
    <div className='flex'>
      <div className='image'>
        <Image width='17' height='17' fill={theme === 'dark' ? '#77D6B4' : '#000A13'}></Image>
      </div>
      <p className={theme}>HighClear</p>
    </div>
  );
}

function Back({ onBackClick }) {
  return (
    <div className='flex' onClick={onBackClick}>
      <FontAwesomeIcon icon={faArrowLeft} size="lg" style={{ color: "#96de98" }} />
    </div>
  );
}

export default Header;