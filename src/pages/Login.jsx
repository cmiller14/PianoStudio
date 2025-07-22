import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAuthToken } from '../store/application_slice';
import { useApi } from '../utils/use_api';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailCreate, setEmailCreate] = useState('');
  const [passwordCreate, setPasswordCreate] = useState('');
  const dispatch = useDispatch();
  const api = useApi();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const {token} = await api.post('http://localhost:3000/api/auth/login', {
        "name": email,
        "email": email,
        "password": password,
      });
      dispatch(setAuthToken(token));
      navigate('/');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

    const handleCreateAccount = async () => {
    try {
      const {token} = await api.post("http://localhost:3000/api/auth/register", {
        "name": emailCreate,
        "email": emailCreate,
        "password": passwordCreate,
      });
      dispatch(setAuthToken(token));
      navigate('/');
    } catch (err) {
      console.error('Login failed', err);
    }
  };




  return (
    <>
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
    <div>
      <input value={emailCreate} onChange={(e) => setEmailCreate(e.target.value)} placeholder="email" />
      <input value={passwordCreate} onChange={(e) => setPasswordCreate(e.target.value)} placeholder="password" type="password" />
      <button onClick={handleCreateAccount}>Create Account</button>
    </div>
    </>
  );
};

export default Login;

