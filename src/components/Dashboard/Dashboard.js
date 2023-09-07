import React from 'react';
import "./Dashboard.css";
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import DashNav from './DashNav/DashNav';
import ContactEdit from './DashNav/ContactEdit/ContactEdit';
import AccountEdit from './DashNav/AccountEdit/AccountEdit.js';
import HomepageEdit from './DashNav/HomepageEdit/HomepageEdit';
import BlogEdit from './DashNav/BlogEdit/BlogEdit';
import PropertiesEdit from './DashNav/PropertiesEdit/PropertiesEdit';

const API_BASE = "http://localhost:3001";


const Dashboard = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);

    // Clear login status
    localStorage.removeItem("loginStatus");

    // Navigate back to the login page
    navigate("/private/login");
    fetch(API_BASE + "/logout", { method: 'POST', credentials: 'include' })
      .then(response => {
        if (response.ok) {
          console.log('Logout Successfully');
        } else {
          console.error('Logout failed');
        }

      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <>
      <div className='dashboard'>
        <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
      <DashNav />

      </div>
      <div>
        <Routes>
          <Route path='/contactedit' element={<ContactEdit />} ></Route>
          <Route path='/accountedit' element={<AccountEdit />} ></Route>
          <Route path='/homepageedit' element={<HomepageEdit />} ></Route>
          <Route path='/blogedit' element={<BlogEdit />} ></Route>
          <Route path='/propertiesedit' element={<PropertiesEdit />} ></Route>
        </Routes>

      </div>
    </>
  )
}

export default Dashboard