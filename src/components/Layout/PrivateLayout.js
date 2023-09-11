import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import PrivateHeader from '../PrivateHeader/PrivateHeader'
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import { useUser } from '../../UserContext';

const PrivateLayout = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const loginStatus = localStorage.getItem('loginStatus');
        if (loginStatus === 'loggedIn') {

            const currentPath = window.location.pathname; // 获取当前URL路径
            if (currentPath.startsWith('/private/dashboard')) {
                navigate(currentPath); // 重定向到当前URL
            } else {
                navigate('/private/dashboard'); // 重定向到默认目标URL
            }
        } else {
            navigate('/private/login');
        }
    }, [navigate]);

    return (
        <div className='PrivateLayout'>
            <PrivateHeader />
            <div className='private-container'>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/dashboard/*' element={<Dashboard />} />
                    <Route path='/' element={user ? <Navigate to='/dashboard' /> : <Navigate to='/private/login' />} />
                </Routes>
            </div>
        </div>)
}

export default PrivateLayout