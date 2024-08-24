import React from 'react';
import './LoginPage.css';
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const LoginPage = () => {
    return (
        <div className='wrapper'>
            <form action="">

                <h1>Brother Database</h1>
                <div className='input-field'>
                    <input type="text" placeholder='Username' required/>
                    <FaUserAlt className = 'icon'/>
                </div>
                <div className='input-field'>
                    <input type="password" placeholder='Password' required/>
                    <RiLockPasswordFill className = 'icon'/>
                </div>

                <div className ="remember">
                    <label><input type="checkbox" />Remember me</label>
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    
    );
};

export default LoginPage;