// components/EventModal.jsx
import React, { useMemo, useState} from 'react';
import '../App.css';
import { useSelector } from 'react-redux';
import { Api } from '../utils/api';

const API_URL = import.meta.env.VITE_API_URL;

function formatLocalDateTime(dateString) {
  console.log('Formatting date:', dateString);
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

function toDateTimeLocalValue(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}


function EventModal({ event, onClose, onRefresh }) {
  if (!event) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: event.title || '',
    description: event.description || '',
    date: event.date || '',
  });


  const isAdmin = useSelector(state => state.application.settings?.isAdmin);
  const isLoggedIn = useSelector(state => !!state.application.authToken);
  const token = useSelector(state => state.application.authToken);

  const api = useMemo(() => new Api(() => token), [token]);

  const handleDelete = async () => {
    await api.del(`${API_URL}/api/schedule/delete/${event.id}`);
    await onRefresh();
    onClose();
  };

  const handleSave = async () => {
    await api.patch(`${API_URL}/api/schedule/update/${event.id}`, {
      title: formData.title,
      description: formData.description,
      date: formData.date,
    });

    setIsEditing(false);
    await onRefresh();
    onClose(); // simple + safe (Schedule refetches anyway)
  };


  return (
    <div className="modal-backdrop">
      <div className="modal-content">

        {isEditing ? (
          <>
            <input
              className="form-control mb-2"
              value={formData.title}
              onChange={e =>
                setFormData(prev => ({ ...prev, title: e.target.value }))
              }
            />

            <input
              type="datetime-local"
              className="form-control mb-2"
              value={toDateTimeLocalValue(formData.date)}
              onChange={e =>
                setFormData(prev => ({ ...prev, date: e.target.value }))
              }
            />

            <textarea
              className="form-control mb-2"
              value={formData.description}
              onChange={e =>
                setFormData(prev => ({ ...prev, description: e.target.value }))
              }
            />

            <div className="d-flex gap-2">
              <button onClick={handleSave} className="btn btn-success">
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3>{event.title}</h3>
            <p className="text-muted">{formatLocalDateTime(event.date)}</p>
            {event.description && <p>{event.description}</p>}

            <div className="d-flex gap-2 mt-3">
              <button onClick={onClose} className="btn btn-secondary">
                Close
              </button>

              {isAdmin && isLoggedIn && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EventModal;

