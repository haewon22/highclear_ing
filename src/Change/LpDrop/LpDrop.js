import React, {useState, useRef, useEffect} from 'react'
import './LpDrop.css'
import useDetectClose from '../../tools/DropdownHook'
import { doc, updateDoc, getDoc } from 'firebase/firestore';

let t = '0'
const useDidMountEffect=(func,deps)=>{
    const didMonut=useRef(false)
  
    useEffect(()=>{
      if(didMonut.current){func()}
      else{
        didMonut.current=true
      }
    },deps);
}
  
const LpDrop = (props) => {
    const dropDownRef = useRef();
    const [isOpen, setIsOpen]= useDetectClose(dropDownRef, false);
    const [time, setTime]=useState(t);
    const userRef=props.userRef
    const docRef=doc(userRef, 'join', props.autoid)

    useEffect(()=>{
        const updateData=async()=>{
            try{
                const docSnap=await getDoc(docRef);
                setTime(docSnap.data().late)
            }catch(error){console.log(error);}
          }
          updateData();
    },[]);

    useDidMountEffect(()=>{
        const updateData=async()=>{
          try{
            await updateDoc(docRef,{
                late: time
            });
          }catch(error){console.log(error);}
        }
        updateData();
    },[time]);

    return(
        <div ref={dropDownRef}>
            <div className='lp' onClick={(event)=> {
                event.stopPropagation();
                setIsOpen((isOpen) => !isOpen)
            }}>
            늦참 {time}분</div>
            {(isOpen ? <div className='arrow_lp_up'></div> : <div className='arrow_lp_down'></div>)}
            {isOpen ? 
            <div className='LpDropDown'>
                <ul className='_ul' onClick={()=>{setIsOpen(false)}}>
                    <li onClick={()=>{
                        setTime('0')}}>0분</li>
                    <li onClick={()=>{
                        setTime('5')}}>5분</li>
                    <li onClick={()=>{
                        setTime('10')}}>10분</li>
                    <li onClick={()=>{
                        setTime('15')}}>15분</li>
                    <li onClick={()=>{
                        setTime('20')}}>20분</li>
                    <li onClick={()=>{
                        setTime('25')}}>25분</li>
                    <li onClick={()=>{
                        setTime('30')}}>30분</li>
                    <li onClick={()=>{
                        setTime('40')}}>40분</li>
                    <li onClick={()=>{
                        setTime('50')}}>50분</li>
                    <li onClick={()=>{
                        setTime('60')}}>60분</li>
                </ul>
            </div> : <></> }
        </div>
    );
}

export default LpDrop