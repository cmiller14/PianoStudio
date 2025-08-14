import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import EventModal from '../components/EventModal';
import { Api } from '../utils/api';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
const API_URL = import.meta.env.VITE_API_URL;


function Schedule() {
  const token = useSelector(state => state.application.authToken);
  const isAdmin = useSelector(state => state.application.settings?.isAdmin);
  const isLoggedIn = useSelector((state) => !!state.application.authToken);
  const api = useMemo(() => new Api(() => token), [token]);

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const calendarEvents = useMemo(() => {
  return events.map(e => ({
    id: String(e.id),
    title: e.title,
    date: e.date,
    extendedProps: {
      description: e.description
    }
  }));
}, [events]);

  useEffect(() => {
    api.get(`${API_URL}/api/schedule`).then(setEvents);
  }, []);


  const handleChange = (e) => {
    setNewEvent(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.date) return alert('Title and date are required');
    const created = await api.post(`${API_URL}/api/schedule/add`, newEvent);
    setEvents(prev => [...prev, created]);
    setNewEvent({ title: '', description: '', date: '' });
  };

  return (
    <>
      <Navigation />

      <header className="masthead" style={{ backgroundImage: 'url("assets/img/about-bg.jpg")' }}>
            <div className="container position-relative px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                <div className="page-heading">
                    <h1>Studio Schedule</h1>
                    <span className="subheading">Lessons, group classes, and availability</span>
                </div>
                </div>
            </div>
            </div>
        </header>

      <main className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">

              <h4>Upcoming Events</h4>
                  <div className="container my-4">
                    <h2 className="mb-4 text-center">Studio Schedule</h2>

                    <FullCalendar
                      timeZone="UTC"
                      plugins={[dayGridPlugin, interactionPlugin]}
                      initialView="dayGridMonth"
                      events={calendarEvents}
                      height="auto"
                      dayMaxEventRows={true} // prevents events from overflowing
                      eventClick={({ event }) => {
                        const { title, extendedProps, start, id } = event;
                        setSelectedEvent({
                          id,
                          title,
                          date: start,
                          description: extendedProps?.description,
                        });
                      }}
                    />

                  </div>
              {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
              {isAdmin && isLoggedIn && (
                <>
                  <h4>Add New Event</h4>
                  <div className="mb-3">
                    <input
                      name="title"
                      value={newEvent.title}
                      onChange={handleChange}
                      className="form-control mb-2"
                      placeholder="Event Title"
                    />
                    <textarea
                      name="description"
                      value={newEvent.description}
                      onChange={handleChange}
                      className="form-control mb-2"
                      placeholder="Event Description (optional)"
                    />
                    <input
                      name="date"
                      type="datetime-local"
                      value={newEvent.date}
                      onChange={handleChange}
                      className="form-control mb-2"
                    />
                    <button onClick={handleAddEvent} className="btn btn-success">Add Event</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Schedule;
