import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const AuthRedirect = () => {
    const navigate = useNavigate();
    const { token } = useAuth();

    React.useEffect(() => {
        if (!token) {
            console.log("No token found, redirecting to login.");
            navigate('/login');
            return;
        }
        const checkAuth = async () => {

            const response = await fetch('http://localhost:8000/api/checkAuth/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            console.log(response);
            if (response.ok) {
                console.log('Authorized!');
                localStorage.setItem('name', response.name);
            }
            else {
                console.log('Not Authorized');
                navigate('/login');
            }
        };
        checkAuth(); 
    }, [token, navigate]);

    return null;
}

export default AuthRedirect;