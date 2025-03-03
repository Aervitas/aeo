import React from 'react';
import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom';
import { useAuth } from '../AuthContext'
import './HeaderBar.css';

export const HeaderBar = () => {  
    
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    if (location.pathname === "/login ") {
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
        
    }

    return (
        <nav>
            <ul>
            <li>
                <NavLink to="/home">Home</NavLink>
            </li>
            <li> 
                <NavLink to="/alum">Alumni</NavLink>
            </li>
            <li>
                <NavLink to="/brotherLogins">Logins</NavLink>
            </li>
            <li>
                <NavLink to="/polls">Polls</NavLink>
            </li>
            <li onClick={handleLogout}>
                <NavLink to="/" className='logout'>Log Out</NavLink>
            </li>
        </ul>
    </nav>
    );
}