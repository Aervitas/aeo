import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export default function Main() {
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
                    navigate('/home');
                }
                else {
                    navigate('/login');
                }
            };
            checkAuth();
        } 
    }, [authToken, navigate]);
}