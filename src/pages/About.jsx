import { useEffect, useState} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { useMemo } from "react";
import { Api } from '../utils/api';
const API_URL = import.meta.env.VITE_API_URL;


function About() {
    const isAdmin = useSelector(state => state.application.settings?.isAdmin);
    const isLoggedIn = useSelector((state) => !!state.application.authToken);
    const token = useSelector(state => state.application.authToken);

    const [messages, setMessages] = useState([]);
    const [editing, setEditing] = useState(false);

    const api = useMemo(() => new Api(() => token), [token]);

    useEffect(() => {
        getMessages();
    }, []);

    async function getMessages() {
        const data = await api.get(`${API_URL}/api/messages/type/about`);
        const mapped = Object.fromEntries(data.map(msg => [msg.name, msg]));
        setMessages(mapped);
    }

    async function saveMessages() {
        for (const [name, messageObj] of Object.entries(messages)) {
            const id = messageObj.id;
            console.log({ content: messageObj.message });
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
      <Navigation />
      <div>
        <header className="masthead" style={{ backgroundImage: 'url("assets/img/about-bg.jpg")' }}>
          <div className="container position-relative px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">
                <div className="page-heading">
                  <h1>About the Studio</h1>
                  <span className="subheading">About Lisa Miller and the Studio</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mb-4">
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
                <div className="row gx-4 gx-lg-5 align-items-center mb-5">
                  <div className="col-md-5">
                    <img className="img-fluid rounded mb-4 mb-md-0" src="assets/img/fam_pic.jpeg" alt="[Lisa Miller and family]" />
                  </div>
                  <div className="col-md-7">
                    {editing ? (
                      <textarea
                        value={messages.about_message_1.message || ''}
                        onChange={(e) => handleChange('about_message_1', e.target.value)}
                        className="form-control"
                      />
                    ) : (
                      <p>{messages.about_message_1?.message}</p>
                    )}
                  </div>
                </div>

                {['about_message_2', 'about_message_3'].map((key) => (
                    <div key={key} className="mb-3">
                        {editing ? (
                        <textarea
                            value={messages?.[key]?.message || ''}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="form-control"
                        />
                        ) : (
                        <p>{messages?.[key]?.message}</p>
                        )}
                    </div>
                    ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default About;
