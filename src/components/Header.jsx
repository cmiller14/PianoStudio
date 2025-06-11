import React from 'react';
import { useEffect, useState } from 'react';
import { useApi } from '../utils/use_api';

function Header() {
    const [messages, setMessages] = useState(null);

    const api = useApi();
    
    useEffect(() => {
        getMessages()
    }, []);

    async function getMessages() {
        const data = await api.get("http://localhost:3000/header/messages");
        setMessages(data);
    }

  return (
    <>
    {/* Page Header*/}
    <header className="masthead" style={{backgroundImage: 'url("assets/img/home-bg.jpg")'}}>
    <div className="container position-relative px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
            <div className="site-heading">
            <h1>{messages?.title}</h1>
            <span className="subheading">{messages?.subHeader} </span>
            <p>{messages?.about}</p>
            </div>
        </div>
        </div>
    </div>
    </header>

    </>
  )
}

export default Header
