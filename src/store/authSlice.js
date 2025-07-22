import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';

const token = localStorage.getItem('token');
const user = token ? jwtDecode(token) : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user,
    token,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.user = jwtDecode(action.payload);
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});


export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
