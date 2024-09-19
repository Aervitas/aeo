import { set } from 'mongoose';
import React, { useContext } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = React.useState(null);
    const [userId, setUserId] = React.useState(null);
    const [roles, setRoles] = React.useState(null);
    const [admin, setAdmin] = React.useState(null);

    React.useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');
        const roles = localStorage.getItem('roles');
        const admin = localStorage.getItem('admin');
        if (token) setAuthToken(token);
        if (userId) setUserId(userId);
        if (roles) setRoles(roles);
        if (admin) setAdmin(admin);
    }, []);


const login = (token, userId, roles, admin) => {
    setAuthToken(token);
    setUserId(userId);
    setRoles(roles);
    setAdmin(admin);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('roles', roles);
    localStorage.setItem('admin', admin);
};

const logout = () => {
    setAuthToken(null);
    setUserId(null);
    setRoles(null);
    setAdmin(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
    localStorage.removeItem('admin');
};

const value = {
    authToken,
    userId,
    roles,
    admin,
    login,
    logout
};

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};