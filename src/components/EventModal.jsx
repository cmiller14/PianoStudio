// components/EventModal.jsx
import React, { useMemo } from 'react';
import '../App.css';
import { useSelector } from 'react-redux';
import { Api } from '../utils/api';

const API_URL = import.meta.env.VITE_API_URL;

function formatLocalDateTime(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString); // local interpretation

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function EventModal({ event, onClose }) {
  if (!event) return null;

  const isAdmin = useSelector(state => state.application.settings?.isAdmin);
  const isLoggedIn = useSelector(state => !!state.application.authToken);
  const token = useSelector(state => state.application.authToken);

  const api = useMemo(() => new Api(() => token), [token]);

  const handleDelete = async () => {
    await api.del(`${API_URL}/api/schedule/delete/${event.id}`);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{event.title}</h3>

        <p className="text-muted">
          {formatLocalDateTime(event.date)}
        </p>

        {event.description && <p>{event.description}</p>}

        <div className="d-flex gap-2 mt-3">
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>

          {isAdmin && isLoggedIn && (
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventModal;

