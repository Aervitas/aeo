import React from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import { useAuth } from '../AuthContext'
import './HeaderBar.css';

export const HeaderBar = () => {  
    
    const location = useLocation();
    const [menuActive, setMenuActive] = React.useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const toggleMenu = () => {
        setMenuActive(!menuActive);
      };

    const handleLogout = () => {
        logout();
        navigate('/login');
        
    }

    if (location.pathname === "/login") {
        return null;
    }

    return (
        
        <nav>
            <button class="hamburger" onClick={toggleMenu} id="hamburger">&#9776;</button>
            <ul className={menuActive ? 'active' : ''}>
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
            <li>
                <NavLink to="/links">Links</NavLink>
            </li>
            <li>
                <NavLink to="/account">Account</NavLink>
            </li>
        </ul>
    </nav>
    
    );
}