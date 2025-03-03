import React, { useContext } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = React.useState(null);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setToken(token);
    }, []);


    const login = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

const value = {
    token,
    login,
    logout
};

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};