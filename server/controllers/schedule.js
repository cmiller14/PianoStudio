import prisma from '../prismaClient.js';


export async function getEvents(req, res) {
  const events = await prisma.scheduleEvent.findMany({
    orderBy: { date: 'asc' },
  });
  res.json(events);
}

export async function addEvent(req, res) {
  const { title, description, date } = req.body;
  const event = await prisma.scheduleEvent.create({
    data: { title, description, date: new Date(date) },
  });
  res.json(event);
}

export async function deleteEvent(req, res) {
  const { id } = req.params;

  try {
    const deleted = await prisma.scheduleEvent.delete({
      where: { id: parseInt(id) },
    });
    res.json({ success: true, deleted });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ success: false, message: 'Failed to delete event' });
  }
}
