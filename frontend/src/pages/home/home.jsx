import React from 'react';
import AuthRedirect from '../../components/AuthRedirect';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import './home.css';

const Home = () => {
    const [fadeIn, setFadeIn] = React.useState(false);

    React.useEffect(() => {
        const timeOut = setTimeout(() => {
            setFadeIn(true);
        }, 100);
    return () => clearTimeout(timeOut);
    }, []);

    
    
    const eventList = [
        {
            title: 'Rush Week',
            start: new Date(2024, 9, 7),
            end: new Date(2024, 9, 12),
            allDay: "true"
        },
        {
            title: 'Brother BBQ',
            start: new Date(2024, 9, 7, 19, 0),
            end: new Date(2024, 9, 7, 21, 0)
        },
        {
            title: 'AGA Picnic',
            start: new Date(2024, 9, 8, 18, 0),
            end: new Date(2024, 9, 8, 21, 0)
        },
        {
            title: 'Brother Meeting',
            start: new Date(2024, 9, 8, 20, 0),
            end: new Date(2024, 9, 8, 21, 0)
        },
        {
            title: 'Beach Bonfire',
            start: new Date(2024, 9, 10, 19, 0),
            end: new Date(2024, 9, 10, 21, 0)
        },
        {
            title: 'Bid Event',
            start: new Date(2024, 9, 11, 19, 0),
            end: new Date(2024, 9, 11, 21, 0)
        },
        {
            title: 'Y2K',
            start: new Date(2024, 9, 12, 22, 0),
            end: new Date(2024, 9, 13, 2, 0)
        }
    ];

    return (
        
        <div className={`homewrapper ${fadeIn ? 'fade-in-visible' : 'fade-in'}`}>
            <AuthRedirect/>
            <div class="container">
                <div class="cal">
                <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar = {{
                    start: 'today prev,next',
                    center: 'title',
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                height={'70vh'}
                events={eventList}
                />
                </div>
            </div>

        </div>
    );
}

export default Home;