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
              const response = await fetch('https://backend.aeoucla.com/api/events/', {
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
                <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar = {{
                    start: 'today prev,next',
                    center: 'title',
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                allDaySlot={'true'}
                height={'80vh'}
                events={eventList}
                />
                </div>
            </div>

        </div>
    );
}

export default Home;