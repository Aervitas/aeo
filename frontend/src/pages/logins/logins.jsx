import React from 'react';
import AuthRedirect from '../../components/AuthRedirect';

import './logins.css';

const Logins = () => {
    const [fadeIn, setFadeIn] = React.useState(false);
    const [logins, setLogins] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    
    React.useEffect(() => {
        const timeOut = setTimeout(() => {
            setFadeIn(true);
        }, 100);
        
        const fetchLogins = async () => {
            const token = localStorage.getItem('token');
            try{
            const response = await fetch("http://localhost:8000/api/brotherLogins/", {
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

        fetchLogins();
        return () => clearTimeout(timeOut);
    }, []);

    
    

    return (
        
        <div className={`homewrapper ${fadeIn ? 'fade-in-visible' : 'fade-in'}`}>
            <AuthRedirect/>
            <div class="container">
                <div className="login-list-container">
                    <h2>Logins</h2>

                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}

                    <div className="login-list">
                        {logins.map((login) => (
                            <div key={login.id} className="login-item">
                                <h3>{login.title}</h3>
                                <p><strong>Username:</strong> {login.username}</p>
                                <p><strong>Email:</strong> {login.email}</p>
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