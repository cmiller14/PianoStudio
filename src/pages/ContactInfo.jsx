import React from 'react';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { useEffect, useState } from 'react';
import { useApi } from '../utils/use_api';


function ContactInfo() {

    const [messages, setMessages] = useState(null);

    const api = useApi();

    useEffect(() => {
        getMessages();
    }, []);

    async function getMessages() {
        const message = await api.get("http://localhost:3000/api/messages/type/contact");
        const mapped = Object.fromEntries(message.map(msg => [msg.name, msg.message]));
        setMessages(mapped);
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
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                <p>
                    {messages?.contact_about}
                </p>
                <h4 className="mt-4">Contact Lisa Miller</h4> <p>
                    <strong>Email:</strong> <a href="mailto:your.email@example.com">messages?.contact_email</a>
                </p>
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