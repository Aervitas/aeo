import React from 'react';
import AuthRedirect from '../../components/AuthRedirect';

import './logins.css';

const Logins = () => {
    const [fadeIn, setFadeIn] = React.useState(false);
    const [logins, setLogins] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [otp, setOtp] = React.useState(null);
    
    React.useEffect(() => {
        const timeOut = setTimeout(() => {
            setFadeIn(true);
        }, 100);
        
        const fetchLogins = async () => {
            const token = localStorage.getItem('token');
            try{
                const response = await fetch("https://backend.aeoucla.com/api/brotherLogins/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`
                    }
                });
            if (response.ok) {
                const data = await response.json();
                setLogins(data);
            } else {
                throw new Error("login fetch failed");
            }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        const fetchOTP = async() => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch("https://backend.aeoucla.com/api/login/getOTP", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setOtp(data.subject);
                } else {
                    throw new Error("otp fetch failed");
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchLogins();
        fetchOTP();
        return () => clearTimeout(timeOut);
    }, []);

    
    

    return (
        
        <div className={`homewrapper ${fadeIn ? 'fade-in-visible' : 'fade-in'}`}>
            <AuthRedirect/>
            <div class="container">
                <div className="login-list-container">
                    <h2>GPT One Time Password</h2>
                    <div className="login-item">
                        <h3>{otp}</h3>
                    </div>
                    <h2>Logins</h2>

                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}

                    <div className="login-list">
                        {logins.map((login) => (
                            <div key={login.id} className="login-item">
                                <h3>{login.title}</h3>
                                <p><strong>Username:</strong> {login.username}</p>
                                {login.email && <p><strong>Email:</strong> {login.email}</p>}
                                <p><strong>Password:</strong> {login.password}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Logins;