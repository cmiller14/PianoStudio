import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsBoard from '../components/NewsBoard';
import { useEffect, useState, useMemo } from 'react';
import { Api} from '../utils/api';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const API_URL = import.meta.env.VITE_API_URL;



export default function Home() {
  const token = useSelector(state => state.application.authToken);
  const isAdmin = useSelector(state => state.application.settings?.isAdmin);
  const isLoggedIn = useSelector((state) => !!state.application.authToken);
  const [messages, setMessages] = useState([]);
  const [editing, setEditing] = useState(false);

  const api = useMemo(() => new Api(() => token), [token]);
  
  useEffect(() => {
      getMessages();
  }, []);

  async function getMessages() {
      const message = await api.get(`${API_URL}/api/messages/type/home`);
      const mapped = Object.fromEntries(message.map(msg => [msg.name, msg]));
      setMessages(mapped);
  }

  async function saveMessages() {
    for (const [name, messageObj] of Object.entries(messages)) {
        const id = messageObj.id;
        const data = await api.put(`${API_URL}/api/messages/edit/${id}`, { content: messageObj.message });
    }
    setEditing(false);
  }

  function handleChange(name, value) {
    setMessages(prev => ({
        ...prev,
        [name]: {
        ...prev[name],
        message: value
        }
    }));
  }



  return (
    <>
    <Navigation/>
    <Header/>
    <NewsBoard/>
      {/* Main Content*/}
      <div className="container px-4 px-lg-5">
            {isAdmin && isLoggedIn && (
              <div className="text-end mb-3">
                {editing ? (
                  <>
                    <button onClick={saveMessages} className="btn btn-success me-2">Save</button>
                    <button onClick={() => setEditing(false)} className="btn btn-secondary">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)} className="btn btn-primary">Edit</button>
                )}
              </div>
            )}
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {/* Post preview*/}
            <div className="post-preview">
              <h2 className="post-title">Studio Schedule</h2>
                {editing ? (
                    <textarea
                        className="form-control mb-3"
                        value={messages.home_schedule?.message || ''}
                        onChange={(e) => handleChange('home_schedule', e.target.value)}
                    />
                    ) : (
                    <h3 className="post-subtitle">
                      <Link to="/schedule" className="my-link">{messages.home_schedule?.message}</Link>
                    </h3>          
                    )
                }
            </div>
            {/* Divider*/}
            <hr className="my-4" />
            <hr className="my-4" />
            {/* Post preview*/}
            <div className="post-preview">
              <h2 className="post-title">About</h2>
                {editing ? (
                  <textarea
                      className="form-control mb-3"
                      value={messages.home_about?.message || ''}
                      onChange={(e) => handleChange('home_about', e.target.value)}
                  />
                  ) : (
                  <h3 className="post-subtitle">
                    <Link to="/about" className="my-link">{messages.home_about?.message}</Link>
                  </h3>
                  )
              }
            </div>
            {/* Divider*/}
            <hr className="my-4" />
            {/* Post preview*/}
            <div className="post-preview">
              <h2 className="post-title">Contact</h2>
                {editing ? (
                  <textarea
                      className="form-control mb-3"
                      value={messages.home_contact?.message || ''}
                      onChange={(e) => handleChange('home_contact', e.target.value)}
                  />
                  ) : (
                   <h3 className="post-subtitle">
                    <Link to="/contact" className="my-link">{messages.home_contact?.message}</Link>
                  </h3>
                  )
              }
            </div>
            {/* Divider*/}
            <hr className="my-4" />
          </div>
        </div>
      </div>
    <Footer/>
    </>
  );
}
