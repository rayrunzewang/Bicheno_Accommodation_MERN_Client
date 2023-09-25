import React from 'react'
import Button from '../Button/Button'
import './Message.css'
import { useNavigate } from 'react-router-dom';



const Message = (props) => {
    const navigate = useNavigate();

    const refresh = () => {
        window.location.reload();
        // navigate('/private/dashboard');
    }
    return (
        <div className='custom-message'>
            <div className='message-container'>
                <h3>{props.message}</h3>
                <div className='message-button'>
                    <Button onClick={refresh} label='OK' />
                </div>
            </div>
        </div>
    )
}

export default Message