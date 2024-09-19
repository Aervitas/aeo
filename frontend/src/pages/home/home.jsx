import React from 'react';
import './home.css';

const Home = () => {
    const [fadeIn, setFadeIn] = React.useState(false);

    React.useEffect(() => {
        const timeOut = setTimeout(() => {
            setFadeIn(true);
        }, 100);

    return () => clearTimeout(timeOut);
    }, []);
    return (
        <div className={`fade-in ${fadeIn ? 'fade-in-visible' : 'fade-in'}`}>
            <h1>Home</h1>
            <button>HOME</button>
        </div>
    );
}

export default Home;