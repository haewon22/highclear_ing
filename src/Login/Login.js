import styles from './Login.module.css';
import Header from '../tools/Header.js';
import Notch from '../tools/Notch.js';
import BottomBar from '../tools/BottomBar.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from "../images/loginbackgroud.png";
import { db } from '../firebase.js';
import { collection, query, doc, getDoc, getDocs } from 'firebase/firestore';

//pw 가져오기
const userpwRef = doc(db,'passwords','userPassword');
const userpwSnap = await getDoc(userpwRef);
const adminpwRef = doc(db,'passwords','adminPassword');
const adminpwSnap = await getDoc(adminpwRef);
const userpw = userpwSnap.data().password;
const adminpw = adminpwSnap.data().password;

//user 이름 및 학번 가져오기
const user = []
const q = query(collection(db, "user"))
const querySnapshot = await getDocs(q)
let uid = null
querySnapshot.forEach((doc) => {
  const newObj = { uid: doc.id, name: doc.data().name, id: doc.data().id }
  user.push(newObj)
})

function Login() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [login, setLogin] = useState(false);
    const [admin, setAdmin] = useState(false);
    var alarm = 'error';

    const handleLogin = event => {
        event.preventDefault();
        for(let i=0; i<user.length;i++){
            if((!login && !admin) && id===user[i].id && pwd===userpw){
                event.preventDefault();
                setLogin(true);
                uid = user[i].uid
                alarm = 'user'
            }
            else if((!admin && !login) && id===user[i].id && pwd===adminpw){
                setAdmin(true)
                uid = user[i].uid
                alarm = 'admin'
            }
        }
        if(alarm === 'error'){
            alert('입력한 값이 올바르지 않습니다.\n다시 입력해주세요.')
        }
    };

    useEffect(() => {
        if (login) {
            navigate('/userhome', { state: uid });
        }
        if (admin) {
            navigate('/adminhome', { state: uid });
        }
    }, [login, admin, navigate]);

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        position: 'relative',
    };

    return (
        <div className={styles.backgr} style={backgroundStyle}>
            <Notch theme='light'></Notch>
            <Header theme='light' back={false}></Header>
            <div className={styles.signin}>Sign in</div>
            <form className={styles.txt} onSubmit={handleLogin}>
                <input type="text" className={styles.txtarea} value={id} placeholder='학번' required onChange={event => setId(event.currentTarget.value)} />
                <input type="password" className={styles.txtarea} value={pwd} placeholder='비밀번호' required onChange={event => setPwd(event.currentTarget.value)} />
                <button type="submit" className={styles.LoginButton}>Login</button>
            </form>
            <BottomBar></BottomBar>
        </div>
    );
}

export default Login;
