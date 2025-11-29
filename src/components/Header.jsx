import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Api } from '../utils/api';
import { updateMessageLocally } from '../store/config_slice';
const API_URL = import.meta.env.VITE_API_URL;

function Header() {
    const dispatch = useDispatch();
    const isAdmin = useSelector(state => state.application.settings?.isAdmin);
    const isLoggedIn = useSelector((state) => !!state.application.authToken);
    const token = useSelector(state => state.application.authToken);

    const [editing, setEditing] = useState(false);

    const messages = useSelector(state => state.config.messages);
    const loading = useSelector(state => state.config.loading);

    const api = useMemo(() => new Api(() => token), [token]);


    async function saveMessages() {
        for (const [name, messageObj] of Object.entries(messages)) {
            const id = messageObj.id;
            const data = await api.put(`${API_URL}/api/messages/edit/${id}`, { content: messageObj.message });
        }
        setEditing(false);
    }

    function handleChange(name, value) {
        dispatch(updateMessageLocally({ name, value }));
    }

    if (loading) return;

  return (
    <>
    {/* Page Header*/}
    <header className="masthead" style={{backgroundImage: 'url("assets/img/home-bg.jpg")'}}>
    <div className="container position-relative px-4 px-lg-5">
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
            <div className="site-heading">
            {editing ? (
                    <textarea
                        className="form-control mb-3"
                        value={messages.header_message_title?.message || ''}
                        onChange={(e) => handleChange('header_message_title', e.target.value)}
                    />
                    ) : (
                    <h1>{messages.header_message_title?.message}</h1>
                    )
            }
            {editing ? (
                <textarea
                    className="form-control mb-3"
                    value={messages.header_message_subtitle?.message || ''}
                    onChange={(e) => handleChange('header_message_subtitle', e.target.value)}
                />
                ) : (
                <span className="subheading">{messages.header_message_subtitle?.message} </span>
                )
            }
            {editing ? (
                <textarea
                    className="form-control mb-3"
                    value={messages.header_message_about?.message || ''}
                    onChange={(e) => handleChange('header_message_about', e.target.value)}
                />
                ) : (
                <p>{messages.header_message_about?.message}</p>
                )
            }
            </div>
        </div>
        </div>
    </div>
    </header>

    </>
  )
}

export default Header
