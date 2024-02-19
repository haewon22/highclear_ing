import React, {useRef, useState} from 'react'
import useDetectClose from '../../tools/DropdownHook.js'
import './UserDrop.css'
import { db } from '../../firebase.js';
import { collection, query, onSnapshot, getDocs } from 'firebase/firestore';

const attendance=[];
const attendanceQ=query(collection(db, "attendance"))

//user 이름 및 학번 가져오기
const user=[]
const q=query(collection(db, "user"))
const querySnapshot=await getDocs(q)
querySnapshot.forEach((doc)=>{
  const newObj = {uid: doc.id, name: doc.data().name, id: doc.data().id}
  user.push(newObj)
})

function UserDrop(props){
    const dropDownRef = useRef();
    const [isOpen, setIsOpen]= useDetectClose(dropDownRef, false);
    const [rerender, setRerender]=useState(false);
    const unsubscribe=onSnapshot(attendanceQ, (querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            const newObj = {date: doc.id, list: doc.data().nuidlist}
            attendance.push(newObj)
            setRerender(!rerender)
        })
    })
    var key=-1;
    var number=0;
    for(let i=0; i<attendance.length;i++){
        if(attendance[i].date===props.p){
            key=i;
            number=attendance[i].list.length;
        }
    }
    return(
        <div ref={dropDownRef}>
            <div className='num'onClick={(event)=> {
                event.stopPropagation();
                setIsOpen((isOpen) => !isOpen)
            }}>{number}명</div>
            {isOpen ? <div className='arrow_n_up'></div> : <div className='arrow_n_down'></div>}
            {isOpen ? <UserList prop={key} num={number}></UserList> : <></>}
        </div>
    );
}

function UserList(props){
    var HowmanyItem=null;
    var listItems=null;
    if(props.prop!==-1){
        var nuidlist=[]
        for(let i=0;i<attendance[props.prop].list.length;i++){
            var num=-1
            for(let j=0; j<user.length;j++){
                if(user[j].uid===attendance[props.prop].list[i]){
                    num=j;
                }
            }
            if(num!==-1){nuidlist.push(user[num].name)}
        }
        listItems=nuidlist.map((element)=>
            <li key={element}>
                {element}
            </li>
        );
    }

    if(props.num===0){
        HowmanyItem=null;
    }else if(props.num===1){
        HowmanyItem='one'
    }else if(props.num===2){
        HowmanyItem='two'
    }else if(props.num===3){
        HowmanyItem='three'
    }else if(props.num===4){
        HowmanyItem='four'
    }else{
        HowmanyItem='standard'
    }

    return(
    <div className='UserDropDown'>
        <div className={HowmanyItem}>
            <ul className='_ul'> 
                {listItems}
            </ul>
        </div>
    </div>
    );
}

export default UserDrop