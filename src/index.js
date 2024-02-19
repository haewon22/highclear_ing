import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import AdminHome from './AdminHome/AdminHome';
import UserHome from './UserHome/UserHome';
import Excel from './Excel/Excel';
import Login from './Login/Login';
import Inquiry from './Inquiry/inquiry';
import Password from './Password/Password';
import Change from './Change/Change';
import UserAtt from './UserAtt/UserAtt';
import AdminAtt from './AdminAtt/AdminAtt';
import Shuttlecock from './Shuttlecock/Shuttlecock';
import DailyAtt from './DailyAtt/DailyAtt';
import ModifyAtt from './ModifyAtt/ModifyAtt';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/userhome" element={<UserHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/excel" element={<Excel />} />
      <Route path="/inquiry" element={<Inquiry />} />
      <Route path="/password" element={<Password />} />
      <Route path="/change" element={<Change />} />
      <Route path="/useratt" element={<UserAtt />} />
      <Route path="/adminatt" element={<AdminAtt />} />
      <Route path="/shuttlecock" element={<Shuttlecock />} />
      <Route path="/dailyatt" element={<DailyAtt />} />
      <Route path="/modifyatt" element={<ModifyAtt />} />
      <Route path="/adminhome" element={<AdminHome />} />
    </Routes>
  </BrowserRouter>
);

