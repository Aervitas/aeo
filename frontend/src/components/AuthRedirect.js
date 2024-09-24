import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const AuthRedirect = () => {
    const navigate = useNavigate();
    const { authToken } = useAuth();

    React.useEffect(() => {
        if (authToken) {
            const checkAuth = async () => {
                const response = await fetch('http://localhost:3001/brothers/checkAuth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                });
                console.log(response);
                if (response.ok) {
                    console.log('Authorized!');
                }
                else {
                    navigate('/login');
                }
            };
            checkAuth();
        } 
    }, [authToken, navigate]);

    return null;
}

export default AuthRedirect;