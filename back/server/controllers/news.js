import { db } from '../../firebase.js';
import { supabase } from "../utils/supabase.js";

export async function uploadNewsImage(req, res) {
  try {
    console.log("File received?", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;

    // Upload buffer directly to Supabase
    const { data, error } = await supabase.storage
      .from("PianoStudio")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }

    // Get a public URL
    const { data: publicUrlData } = supabase.storage
      .from("PianoStudio")
      .getPublicUrl(fileName);

    return res.json({ url: publicUrlData.publicUrl });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}



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
  const { title, date, body, image } = req.body;

  try {
    const docRef = await db.collection('newsEvents').add({
      title,
      date, // stored as Firestore Timestamp
      body,
      image: image || null
    });

    res.json({ id: docRef.id, title, body, date, image });
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