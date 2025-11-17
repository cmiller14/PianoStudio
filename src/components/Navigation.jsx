import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setAuthToken } from "../store/application_slice";
// In your index.js or App.js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // This includes Popper



function Navigation() {

  const role = useSelector(state => state.application.settings?.role);
  const authToken = useSelector(state => state.application.authToken);
  const isLoggedIn = useSelector((state) => !!state.application.authToken);
  const dispatch = useDispatch();
  const isAdmin = role === "admin";

  function logout() {
    dispatch(setAuthToken(null));
  }

  return (
    <>
        {/* Navigation*/}
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div className="container px-4 px-lg-5">
            <Link className="navbar-brand" to="/">Lisa Miller</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fas fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto py-4 py-lg-0">
                <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/">Home</Link></li>
                <li className='nav-item'><Link className='nav-link px-lg-3 py-3 py-lg-4' to="/">News Board</Link></li>
                <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/schedule">Studio Schedule</Link></li>
                <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/about">About</Link></li>
                <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/contact">Contact</Link></li>
                <li className='nav-item'><Link className='nav-link px-lg-3 py-3 py-lg-4' to="/login">Login</Link></li>
                {isAdmin && isLoggedIn && (
                    <li className='nav-item'><Link className='nav-link px-lg-3 py-3 py-lg-4' to="/">Admin</Link></li>
                )}
                {isLoggedIn && (
                    <li className='nav-item'><Link className='nav-link px-lg-3 py-3 py-lg-4' onClick={logout}>Logout</Link></li>
                )}
                

            </ul>
            </div>
        </div>
        </nav>
    </>
  )
}

export default Navigation