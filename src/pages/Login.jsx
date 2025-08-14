import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setAuthToken } from '../store/application_slice';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Api} from '../utils/api';
const API_URL = import.meta.env.VITE_API_URL;


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = useSelector(state => state.application.authToken);
  const dispatch = useDispatch();
  
  const api = useMemo(() => new Api(() => token), [token]);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { token } = await api.post(`${API_URL}/api/auth/login`, {
        name: email,
        email,
        password,
      });
      if (token === undefined) {
        return
      }
      dispatch(setAuthToken(token));
      navigate('/');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <>
      <Navigation />
      <header className="masthead" style={{backgroundImage: 'url("assets/img/about-bg.jpg")'}}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="page-heading">
                <h1>Login</h1>
                <span className="subheading">Welcome back. Log in or create an account.</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="my-5">
                <h4 className="mb-3">Login</h4>
                <div className="form-floating mb-3">
                  <input className="form-control" id="loginEmail" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                  <label htmlFor="loginEmail">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id="loginPassword" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                  <label htmlFor="loginPassword">Password</label>
                </div>
                <button className="btn btn-primary text-uppercase w-100 mb-4" onClick={handleLogin}>Login</button>

                <hr />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;


