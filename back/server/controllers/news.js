import { db } from '../../firebase.js';


// Get all events (ordered by date ascending)
export async function getEvents(req, res) {
  try {
    const snapshot = await db.collection('newsEvents').orderBy('date', 'desc').get();
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate ? doc.data().date.toDate() : doc.data().date // convert Firestore Timestamp
    }));
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
}


export async function addEvent(req, res) {
  const { title, date, body } = req.body;

  try {
    const docRef = await db.collection('newsEvents').add({
      title,
      date, // stored as Firestore Timestamp
      body
    });

    res.json({ id: docRef.id, title, body, date });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Failed to add event' });
  }
}

// Delete an event by ID
export async function deleteEvent(req, res) {
  const { id } = req.params;

  try {
    const docRef = db.collection('newsEvents').doc(id);
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