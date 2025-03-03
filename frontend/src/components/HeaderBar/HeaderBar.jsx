import React from 'react';
import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom';
import { useAuth } from '../AuthContext'
import './HeaderBar.css';

export const HeaderBar = () => {  
    
    const location = useLocation();
    const [menuOpen, setMenuOpen] = React.useState(false);
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
            <Link to="/home" className='title'>Home</Link>
            <div className="menu" onClick={() => {
                setMenuOpen(!menuOpen);
            }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
            <li> 
                <NavLink to="/alum">Alumni</NavLink>
            </li>
            <li>
                <NavLink to="/brotherLogins">Logins</NavLink>
            </li>
            <li>
                <NavLink to="/polls">Polls</NavLink>
            </li>
            <li onClick={handleLogout} class="LogoutButton">
                <NavLink>Log Out</NavLink>
            </li>
        </ul>
    </nav>
    );
}