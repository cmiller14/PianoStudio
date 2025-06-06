import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function About() {
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
                        Based in Bountiful, Utah, Lisa is a foundational figure in the studio, bringing over two decades of dedicated experience and a genuine passion for introducing the joy of piano to young learners. Her lifelong connection with the piano began in her own childhood, where she built a strong musical foundation through extensive lessons and study with talented professional instructors. This rich history and love for the instrument inspire her work teacahing musical talent to the next generation.
                    </p>
                    </div>
                </div>
                <p>At Lisa Miller Piano Studio, the primary focus is on fostering a positive and encouraging environment where young learners can develop a deep love for music and unlock their creativity. Private lessons, tailored to each student's pace and goals, are typically 30 to 45 minutes in length and are scheduled once or twice per week. </p>
                <p>In addition to individual instruction, group classes are held periodically, often before recitals, to build ensemble skills and confidence. Students also have the option to participate in events such as the Federation piano competition for performance and evaluation opportunities.</p>
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