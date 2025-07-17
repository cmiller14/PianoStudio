import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/Navigation';
import Header from '../components/header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useApi } from '../utils/use_api';


export default function Home() {
  const [messages, setMessages] = useState(null);

  const api = useApi();
  
  useEffect(() => {
      getMessages();
  }, []);

  async function getMessages() {
      const message = await api.get("http://localhost:3000/api/messages/type/home");
      const mapped = Object.fromEntries(message.map(msg => [msg.name, msg.message]));
      setMessages(mapped);
  }



  return (
    <>
    <Navigation/>
    <Header/>
      {/* Main Content*/}
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {/* Post preview*/}
            <div className="post-preview">
              <a href="schedule">
                <h2 className="post-title">Studio Schedule</h2>
                <h3 className="post-subtitle">View the Current Lesson and Group Class Schedule</h3>
              </a>
              {/* <p class="post-meta">
                            Posted by
                            <a href="#!">Start Bootstrap</a>
                            on September 24, 2023
                        </p> */}
            </div>
            {/* Divider*/}
            <hr className="my-4" />
            {/* Post preview*/}
            {/* <div class="post-preview">
                        <a href="post.html"><h2 class="post-title">I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.</h2></a>
                        <p class="post-meta">
                            Posted by
                            <a href="#!">Start Bootstrap</a>
                            on September 18, 2023
                        </p>
                    </div> */}
            {/* Divider*/}
            <hr className="my-4" />
            {/* Post preview*/}
            <div className="post-preview">
              <a href="about">
                <h2 className="post-title">About</h2>
                <h3 className="post-subtitle">An Uplifting Space to Learn, Create, and Grow Through Music</h3>
              </a>
              {/* <p class="post-meta">
                            Posted by
                            <a href="#!">Start Bootstrap</a>
                            on August 24, 2023
                        </p> */}
            </div>
            {/* Divider*/}
            <hr className="my-4" />
            {/* Post preview*/}
            <div className="post-preview">
              <a href="contact">
                <h2 className="post-title">Contact</h2>
                <h3 className="post-subtitle">Reach Out to Ask About Lessons, Availability, or Any Other Questions</h3>
              </a>
              {/* <p class="post-meta">
                            Posted by
                            <a href="#!">Start Bootstrap</a>
                            on July 8, 2023
                        </p> */}
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
