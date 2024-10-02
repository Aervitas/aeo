import React from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import './HeaderBar.css';

export const HeaderBar = () => {  
    
    const location = useLocation();
    const [menuOpen, setMenuOpen] = React.useState(false);

    if (location.pathname === "/login ") {
        return null;
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
                <NavLink to="/logins">Logins</NavLink>
            </li>
            <li>
                <NavLink to="/polls">Polls</NavLink>
            </li>
        </ul>
    </nav>
    );
}