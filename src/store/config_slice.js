// src/store/configSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../utils/api";

const API_URL = import.meta.env.VITE_API_URL;

// Thunk: fetch messages for a specific page
export const fetchMessages = createAsyncThunk(
  "config/fetchMessages",
  async ({ token, page }) => {
    const api = new Api(() => token);
    const result = await api.get(`${API_URL}/api/messages/type/${page}`);
    return Object.fromEntries(result.map(msg => [msg.name, msg]));
  }
);

const configSlice = createSlice({
  name: "config",
  initialState: {
    messages: {},
    loading: false,
    error: null
  },
  reducers: {
    updateMessageLocally: (state, { payload }) => {
      const { name, value } = payload;
      state.messages[name].message = value;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.messages = {
            ...state.messages,
            ...payload
        };
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { updateMessageLocally } = configSlice.actions;

export const configReducer = configSlice.reducer;
