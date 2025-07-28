import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function Schedule() {
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
                    <h1>Studio Schedule</h1>
                    <span className="subheading">Lessons, group classes, and availability</span>
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
                {/* Schedule a Lesson FIRST */}
                <div className="mt-5">
                    <h4>Schedule a Lesson</h4>
                    <p>Click the button below to access the booking page and schedule your lesson at a time that works for you.</p>
                    <p>
                    <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1YI2mHWyiINBTNG3GayZkNIPKE6xzuRIg_3syy-KcM2qdKxvtP-k4yIH8r69UZS85gbRDsKOJt" target="_blank" className="btn btn-primary">
                        <i className="fas fa-calendar-check" /> Book a Lesson Now
                    </a>
                    </p>
                </div>
                {/* Embedded Google Calendar */}
                <iframe src="https://calendar.google.com/calendar/embed?src=pianomom.2025%40gmail.com&ctz=America%2FDenver" style={{border: 0}} width={800} height={600} frameBorder={0} scrolling="no" />
                {/* Rescheduling Information */}
                <div className="mt-5">
                    <h4>Should you need to reschedule a lesson:</h4>
                    <ul>
                    <li>Please review the calendar above to find potential openings or opportunities to swap times with another student</li>
                    <li>After identifying a suitable alternative time, contact Lisa Miller to finalize the schedule change.</li>
                    </ul>
                    <p>Thank you for your understanding and cooperation.</p>
                </div>
                </div>
            </div>
            </div>
        </main>
        </div>
        <Footer/>
    </>
  )
}

export default Schedule