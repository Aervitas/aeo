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
        
        const fetchEvents = async () => {
            try {
              const response = await fetch('http://localhost:8000/api/events/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
              });
              if (!response.ok) {
                console.error("Error fetching events:", data.statusText);
                return;
              }
              const data = await response.json();

              const transformedEvents = data.map(event => ({
                title: event.title,
                start: new Date(event.start),  // Converts ISO string to JS Date object (optional)
                end: new Date(event.end),
                allDay: event.allDay,         // Or, if needed: event.all_day === true
              }));
              setEventList(transformedEvents);
              console.log(eventList);
            } catch (error) {
              console.error("Error fetching events:", error);
            }
          };

          fetchEvents();

        return () => clearTimeout(timeOut);
    }, []);

    
    

    return (
        
        <div className={`homewrapper ${fadeIn ? 'fade-in-visible' : 'fade-in'}`}>
            <AuthRedirect/>
            <div class="container">
                <div class="cal">
                <iframe src="https://calendar.google.com/calendar/embed?src=aeobruin%40gmail.com&ctz=America%2FLos_Angeles" style={{border: 0}} width="800" height="600" frameborder="0" scrolling="no"></iframe>
                </div>
            </div>

        </div>
    );
}

export default Home;