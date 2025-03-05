import React from 'react';
import AuthRedirect from '../../components/AuthRedirect';
import './account.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';

const Account = () => {
    const [fadeIn, setFadeIn] = React.useState(false);
    const [currPassword, setCurrPassword] = React.useState([null]);
    const [newPassword, setNewPassword] = React.useState([null]);
    const [confirmNewPassword, setConfirmNewPassword] = React.useState([null]);
    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();
    const {logout} = useAuth();
    React.useEffect(() => {
        const timeOut = setTimeout(() => {
            setFadeIn(true);
        }, 100);
        
        

        return () => clearTimeout(timeOut);
    }, []);

    const resetClick = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const element = document.getElementById('error-message');
        if (newPassword !== confirmNewPassword) {
            setErrorMessage("Passwords do not match");
            if (element) {
                element.style.color = 'red';
            }

            return;
        }
        try {
            const response = await fetch('http://localhost:8000/api/login/changePassword', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${token}`
              },
              body: JSON.stringify({
                oldPassword: currPassword,
                newPassword: newPassword,
            }),
            });
            if (!response.ok) {
                if (response.status === 403) {
                    setErrorMessage("Incorrect Password");
                    if (element) {
                        element.style.color = 'red';
                    }
                    console.log("error");
                    return;
                }
                setErrorMessage("Error Resetting Password");
                return;
              }
            setErrorMessage("Password Reset Successfully");
            if (element) {
                element.style.color = 'lightgreen';
            }
          } catch (error) {
            setErrorMessage("Error Resetting password");
            if (element) {
                element.style.color = 'red';
            }
            console.log(error);
          }
        }   
    
    

    return (
        
        <div className={`account-wrapper ${fadeIn ? 'fade-in-visible' : 'fade-in'}`}>
            <AuthRedirect/>
            <div class="container">
                <form onSubmit={resetClick}>
                                <h1>Password Reset</h1>
                                <div className='input-field'>
                                    <input type="password" placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
                                </div>
                                <div className='input-field'>
                                    <input type="password" placeholder='Confirm New Password' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required/>
                                </div>
                                <div className='input-field'>
                                    <input type="password" placeholder='Current Password' value={currPassword} onChange={(e) => setCurrPassword(e.target.value)} required/>
                                </div>
                                <button type='submit'>Reset Password</button>
                
                                {errorMessage && <p id='error-message'>{errorMessage}</p>}
                            </form>
                <div class="sign-out" onClick={logout}>
                    Sign Out
                </div>
            </div>
        </div>
        
    );
}

export default Account;