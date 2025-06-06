import React from 'react';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

function ContactInfo() {
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
                    Have questions about lessons, availability, or anything else regarding the studio? Please feel free to reach out using the contact methods below. We look forward to hearing from you!
                </p>
                <h4 className="mt-4">Contact Lisa Miller</h4> <p>
                    <strong>Email:</strong> <a href="mailto:your.email@example.com">pianomom.2025@gmail.com</a>
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