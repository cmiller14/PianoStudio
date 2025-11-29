import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchMessages } from './store/config_slice';
import Home from './pages/Home';
import About from './pages/About';
import ContactInfo from './pages/ContactInfo';
import Schedule from './pages/Schedule';
import Login from './pages/Login';

function App() {

  const dispatch = useDispatch();
  const token = useSelector(state => state.application.authToken);

  useEffect(() => {
    dispatch(fetchMessages({ token, page: "home" }));
    dispatch(fetchMessages({token, page: "about"}));
    dispatch(fetchMessages({token, page: "header"}));
    dispatch(fetchMessages({token, page: "contact"}));
  }, [dispatch, token]);

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About/>} />
      <Route path="/schedule" element={<Schedule/>} />
      <Route path="/contact" element={<ContactInfo/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
