import { db } from '../../firebase.js';

// Get all events (ordered by date ascending)
export async function getEvents(req, res) {
  try {
    const snapshot = await db
      .collection('scheduleEvents')
      .orderBy('date', 'asc')
      .get();

    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
}

// Add an event
export async function addEvent(req, res) {
  const { title, description, date } = req.body;

  try {
    const docRef = await db.collection('scheduleEvents').add({
      title,
      description,
      date, // stored as string in local time format
    });

    res.json({ id: docRef.id, title, description, date });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Failed to add event' });
  }
}

// Delete an event by ID
export async function deleteEvent(req, res) {
  const { id } = req.params;

  try {
    const docRef = db.collection('scheduleEvents').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    await docRef.delete();
    res.json({ success: true, deleted: { id, ...doc.data() } });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ success: false, message: 'Failed to delete event' });
  }
}

// Update an event by ID
export async function updateEvent(req, res) {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    const docRef = db.collection('scheduleEvents').doc(id);
    const doc = await docRef.get();

  if (!doc.exists) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  // Build update object safely (no overwriting with undefined)
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (date !== undefined) updates.date = date; // local-time string

  await docRef.update(updates);

  res.json({
    success: true,
    updated: {
      id,
      ...doc.data(),
      ...updates,
    },
  });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ success: false, message: 'Failed to update event' });
  }
}

