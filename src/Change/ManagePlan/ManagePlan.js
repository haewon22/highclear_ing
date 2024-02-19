import { useState, useEffect, useRef } from 'react';
import UserDrop from '../UserDrop/UserDrop.js';
import LpDrop from '../LpDrop/LpDrop.js';
import './ManagePlan.css'
import dayjs from 'dayjs';
import { db } from '../../firebase.js';
import { collection, doc, onSnapshot, query, deleteDoc, setDoc, addDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

var col=[];
var arr=[];
var autoid=null;

const useDidMountEffect=(func,deps)=>{
  const didMonut=useRef(false)

  useEffect(()=>{
    if(didMonut.current){func()}
    else{
      didMonut.current=true
    }
  },deps);
}
/* 날짜 바뀔 때 새로고침 되도록 할 필요성 있음 */
function ManagePlan(props){
  const [init, setInit]=useState(true);
  const [lock, setLock]=useState(false);
  const lis=[
    {id: 1, layout: 'mint', txt: '월'},
    {id: 2, layout: 'lightgreen', txt: '화'},
    {id: 3, layout: 'mint', txt: '수'},
    {id: 4, layout: 'lightgreen', txt: '목'},
    {id: 5, layout: 'mint', txt: '금'}
  ]
  const userRef=doc(db, 'user', props.uid);
  const joinRef=collection(userRef, 'join');
  const q=query(joinRef);

  //day.js 시간 받아오기
  let key=null;
  var std=props.p;
  if(props.day === 'Mon'){
    key=0;}
  else if(props.day === 'Tue'){
    key=1;}
  else if(props.day === 'Wed'){
    key=2;}
  else if(props.day === 'Thu'){
    key=3;}
  else if(props.day === 'Fri'){
    key=4;}
  var i=0;
  while(std.add(i,"day").get("d")!==key+1){i++}
  const month=std.add(i,"day").get("M")+1;
  const date=std.add(i,"day").get("D");
  const dateinfo=std.add(i,"day").get("year")+'-'+month+'-'+date;
  
  useEffect(()=>{
    for(let i=0; i<col.length;i++){
      if(col[i].date===dateinfo){
        arr.push(dateinfo)
      }
    }
  },[]);

  const [abs, setAbs]=useState(arr);
  const [join, setJoin]=useState(false);

  var isSameOrAfter=require('dayjs/plugin/isSameOrAfter.js')
  dayjs.extend(isSameOrAfter)
  var now=dayjs();
  now.format();
  if((!lock)&&now.isSameOrAfter(dateinfo)){
    //setLock(true);
  }

  //onSnapShot
  const unsubscribe=onSnapshot(q, (querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
      const newObj = {id: doc.id, date: doc.data().date}
      var dup=false
      for(let i=0;i<col.length;i++){
        if(col[i].id===newObj.id){
          dup=true
        }
      }
      if(!dup){col.push(newObj)}
    })
    var check=false;
    for(let i=0; i<col.length;i++){
      if(col[i].date===dateinfo){
        if(!abs.includes(dateinfo)){
          var newArr=[...abs]
          newArr.push(dateinfo)
          setAbs(newArr)
        }
        check=true;
      }
    }
    if(!check&&abs.includes(dateinfo)){
      var gbArr=[...abs]
      for(let i=0;i<gbArr.length;i++){
        if(gbArr[i]===dateinfo){
          gbArr.splice(i, 1);
          i--;
        }
      }
      setAbs(gbArr)
    }
  })
  //
  //디자인
  let name = null;
  if(!lock){
    if(abs.includes(dateinfo)){
      name = lis[key].layout+'_j'}
      var index=-1;
          for(let i=0; i<col.length;i++){
            if(col[i].date===dateinfo){
              index=i;
            }
          }
          if(index!==-1){
            autoid=col[index].id
          }
    else{
      name = lis[key].layout+'_a'}
  }else if(lock){
    if(!abs.includes(dateinfo)){
      name='stop_a'}
    else{
      name='stop_j'}
  }
  //
  useDidMountEffect(()=>{
    const updateData=async()=>{
      const attendanceRef=doc(db, 'attendance' ,dateinfo);
      if(init){
        setInit(false)
        setJoin(!join)
      }else{
      try{
        if(join){//값 추가
          //user-join
          await addDoc(joinRef,{
            date: dateinfo,
            late: 0
          })
          try{
            await updateDoc(attendanceRef,{
              nuidlist: arrayUnion(props.uid)
            });
          }catch{
            await setDoc(attendanceRef,{
              nuidlist: arrayUnion(props.uid)
            })
          }
        }else{//값 삭제
          //attendance
          await updateDoc(attendanceRef,{
            nuidlist: arrayRemove(props.uid)
          });
          //user-join
          var del=-1;
          for(let i=0; i<col.length;i++){
            if(col[i].date===dateinfo){
              del=i;
            }
          }
          if(del!==-1){
            let auto=col[del].id
            col.splice(del)
            await deleteDoc(doc(joinRef , auto));
          }
        }
      }catch(error){console.log(error);}      
      }}
      updateData();
  }, [join]);

  return(
    <div className={props.day}>
      <div className = {name} onClick={event=>{
          event.preventDefault()
          if(!lock){
            if( (abs.includes(dateinfo)&&join) || (!abs.includes(dateinfo)&&!join)){
              setInit(false)
              setJoin(!join)
            }
            else if((init && abs.includes(dateinfo))){
              setJoin(!join)
            }
          }
        }}>
        <div className='day'>{month}월 {date}일 {lis[key].txt}요일</div>
        {(!lock) && (abs.includes(dateinfo)) && <LpDrop autoid={autoid} userRef={userRef}/>}
        {<UserDrop p={dateinfo}/>}
      </div>
    </div>
    );
  }

export default ManagePlan