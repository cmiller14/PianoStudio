import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Api } from '../utils/api';

function Header() {
    const token = useSelector(state => state.application.authToken);
    const [messages, setMessages] = useState(null);

    const api = useMemo(() => new Api(() => token), [token]);
    
    useEffect(() => {
        getMessages()
    }, []);

    async function getMessages() {
        const message = await api.get("http://localhost:3000/api/messages/type/header");
        const mapped = Object.fromEntries(message.map(msg => [msg.name, msg.message]));
        setMessages(mapped);
    }

  return (
    <>
    {/* Page Header*/}
    <header className="masthead" style={{backgroundImage: 'url("assets/img/home-bg.jpg")'}}>
    <div className="container position-relative px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
            <div className="site-heading">
            <h1>{messages?.header_message_title}</h1>
            <span className="subheading">{messages?.header_message_subtitle} </span>
            <p>{messages?.header_message_about}</p>
            </div>
        </div>
        </div>
    </div>
    </header>

    </>
  )
}

export default Header
