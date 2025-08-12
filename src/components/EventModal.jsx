// components/EventModal.jsx
import React from 'react';
import '../App.css';
import { useSelector } from 'react-redux';
import { Api } from '../utils/api';
import { useMemo } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function EventModal({ event, onClose }) {
  if (!event) return null;

  const isAdmin = useSelector(state => state.application.settings?.isAdmin);
  const isLoggedIn = useSelector((state) => !!state.application.authToken);
  const token = useSelector(state => state.application.authToken);

  const api = useMemo(() => new Api(() => token), [token]);

  const deleteEvent = async () => {
    const data = await api.del(`${API_URL}/api/schedule/delete/${event.id}`);
    onClose()
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{event.title}</h3>
        <p>{new Date(event.date).toLocaleString()}</p>
        {event.description && <p>{event.description}</p>}
        <button onClick={onClose} className="btn btn-secondary mt-3">Close</button>
        {isAdmin && isLoggedIn && (
          <button onClick={deleteEvent} className="btn btn-secondary mt-3">Delete</button>
        )}
      </div>
    </div>
  );
}

export default EventModal;
