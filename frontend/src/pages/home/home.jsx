import React from 'react';
import AuthRedirect from '../../components/AuthRedirect';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import './home.css';

const Home = () => {
    const [fadeIn, setFadeIn] = React.useState(false);
    const [eventList, setEventList] = React.useState([]);

    const token = localStorage.getItem('token');
    React.useEffect(() => {
        const timeOut = setTimeout(() => {
            setFadeIn(true);
        }, 100);
        return () => clearTimeout(timeOut);
    }, []);

    
    

    return (
        
        <div className={`homewrapper ${fadeIn ? 'fade-in-visible' : 'fade-in'}`}>
            <AuthRedirect/>
            <div class="container">
                <div class="cal">
                  <iframe src="https://calendar.google.com/calendar/embed?src=aeobruin%40gmail.com&ctz=America%2FLos_Angeles" class="gcal" style={{border: 0}}  frameborder="0" scrolling="no"></iframe>
                </div>
            </div>

        </div>
    );
}

export default Home;