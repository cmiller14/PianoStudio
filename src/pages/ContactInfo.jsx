import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { useEffect, useState, useMemo } from 'react';
import { Api } from '../utils/api';
import { useSelector } from 'react-redux';
const API_URL = import.meta.env.VITE_API_URL;

function ContactInfo() {

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
        const message = await api.get(`${API_URL}/api/messages/type/contact`);
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
        <div>
        {/* Page Header*/}
        <header className="masthead" style={{backgroundImage: 'url("assets/img/about-bg.jpg")'}}>
            <div className="container position-relative px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                <div className="page-heading">
                    <h1>Contact </h1>
                    <span className="subheading">Have questions or concerns?</span>
                </div>
                </div>
            </div>
            </div>
        </header>
        {/* Main Content*/}
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
                {editing ? (
                    <textarea
                        className="form-control mb-3"
                        value={messages.contact_about?.message || ''}
                        onChange={(e) => handleChange('contact_about', e.target.value)}
                    />
                    ) : (
                    <p>{messages.contact_about?.message}</p>
                    )
                }
                <h4 className="mt-4">Contact Lisa Miller</h4>
                {editing ? (
                    <input
                        type="email"
                        className="form-control"
                        value={messages.contact_email?.message || ''}
                        onChange={(e) => handleChange('contact_email', e.target.value)}
                    />
                    ) : (
                    <p>
                        <strong>Email:</strong>{' '}
                        <a href={`mailto:${messages.contact_email?.message}`}>
                        {messages.contact_email?.message}
                        </a>
                    </p>
                    )}
                </div>
            </div>
            </div>
        </main>
        </div>
        <Footer/>

    </>
  )
}

export default ContactInfo