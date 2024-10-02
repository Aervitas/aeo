import React, { useContext } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = React.useState(null);
    const [userId, setUserId] = React.useState(null);
    const [roles, setRoles] = React.useState(null);
    const [admin, setAdmin] = React.useState(null);
    const [name, setName] = React.useState(null);

    React.useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');
        const roles = localStorage.getItem('roles');
        const admin = localStorage.getItem('admin');
        const name = localStorage.getItem('name');
        if (token) setAuthToken(token);
        if (userId) setUserId(userId);
        if (roles) setRoles(roles);
        if (admin) setAdmin(admin);
        if (name) setName(name);
    }, []);


const login = (token, userId, roles, admin) => {
    setAuthToken(token);
    setUserId(userId);
    setRoles(roles);
    setAdmin(admin);
    setName(name);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('roles', roles);
    localStorage.setItem('admin', admin);
    localStorage.setItem('name', name);
};

const logout = () => {
    setAuthToken(null);
    setUserId(null);
    setRoles(null);
    setAdmin(null);
    setName(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
    localStorage.removeItem('admin');
    localStorage.removeItem('name');
};

const value = {
    authToken,
    userId,
    roles,
    admin,
    name,
    login,
    logout
};

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};