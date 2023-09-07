import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom';
import ContactEdit from './ContactEdit/ContactEdit';


const DashNav = () => {
    return (
        <>
            <h2 className='dashboard-title'>Dashbord</h2>
            <div className='dashboard-container'>
                <NavLink className='dashboard-item' to='/private/dashboard/accountedit'>Account</NavLink>
                <NavLink className='dashboard-item' to='/private/dashboard/contactedit'>Contact</NavLink>
                <NavLink className='dashboard-item' to='/private/dashboard/homepageedit'>Homepage</NavLink>
                <NavLink className='dashboard-item' to='/private/dashboard/blogedit'>Blog</NavLink>
                <NavLink className='dashboard-item' to='/private/dashboard/propertiesedit'>Properties</NavLink>
            </div>

        </>
    )
}

export default DashNav