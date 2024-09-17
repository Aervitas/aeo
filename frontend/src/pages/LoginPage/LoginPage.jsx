import React from 'react';
import './LoginPage.css';
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";


const LoginPage = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);
    const [errorMessage, setErrorMesssage] = React.useState('');

    const loginClick = async (e) => {
        e.preventDefault();
        const checkbox = document.getElementById('rememberMe');
        const response = await fetch('http://localhost:3001/brothers/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                rememberMe: rememberMe
            })
        });
        if (response.ok) {
            alert('Login successful');
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
        } else {
            setErrorMesssage('Login failed. Contact admin if you need a new login.');
    }
    }
    return (
        <div className='wrapper'>
            <form onSubmit={loginClick}>

                <h1>Brother Database</h1>
                <div className='input-field'>
                    <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <FaUserAlt className = 'icon'/>
                </div>
                <div className='input-field'>
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <RiLockPasswordFill className = 'icon'/>
                </div>

                <div className ="remember">
                    <label><input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>Remember me</label>
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    
    );
};


export default LoginPage;