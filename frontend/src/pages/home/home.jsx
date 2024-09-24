import React from 'react';
import AuthRedirect from '../../components/AuthRedirect';
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
        
        <div className={`homewrapper ${fadeIn ? 'fade-in-visible' : 'fade-in'}`}>
            <AuthRedirect/>
            <h1>Home</h1>
            <div class="container">
                <div class="column">
                    <button>Alumni DB</button>
                </div>
                <div class="column">
                    <button>Logins</button>
                </div>
                <div class="column">
                    <button>Polls</button>
                </div>
            </div>

        </div>
    );
}

export default Home;