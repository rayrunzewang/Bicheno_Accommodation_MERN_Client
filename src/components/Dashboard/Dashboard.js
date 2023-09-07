import React from 'react';
import "./Dashboard.css";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

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

        <h2 className='dashboard-title'>Dashbord</h2>
        <div className='dashboard-container'>
          <Link className='dashboard-item'>Account</Link>
          <Link className='dashboard-item'>Contact</Link>
          <Link className='dashboard-item'>Homepage</Link>
          <Link className='dashboard-item'>Blog</Link>
          <Link className='dashboard-item'>Properties</Link>

        </div>

      </div>

    </>
  )
}

export default Dashboard