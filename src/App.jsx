import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import ContactInfo from './pages/ContactInfo';
import ContactMe from './pages/ContactMe';
import Schedule from './pages/Schedule';
import Login from './pages/Login';

function App() {

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
