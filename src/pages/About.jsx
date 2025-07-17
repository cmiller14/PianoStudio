import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useApi } from '../utils/use_api';

function About() {

    const [messages, setMessages] = useState(null);

    const api = useApi();
    
    useEffect(() => {
        getMessages();
    }, []);

    async function getMessages() {
        const message = await api.get("http://localhost:3000/api/messages/type/about");
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
                    <h1>About the Studio</h1>
                    <span className="subheading">About Lisa Miller and the Studio</span>
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
                <div className="row gx-4 gx-lg-5 align-items-center mb-5"> <div className="col-md-5"> <img className="img-fluid rounded mb-4 mb-md-0" src="assets/img/fam_pic.jpeg" alt="[Lisa Miller and family]" />
                    </div>
                    <div className="col-md-7"> <p>
                        {messages?.about_message_1}
                    </p>
                    </div>
                </div>
                <p>{messages?.about_message_2}</p>
                <p>{messages?.about_message_3}</p>
                </div>
            </div>
            </div>
        </main>
        </div>
        <Footer/>
    </>
  )
}

export default About