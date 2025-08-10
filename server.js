const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let places = [
  { id: 1, name: "Riverside Park", city: "Durham" },
  { id: 2, name: "Downtown Conference Center", city: "Durham" },
  { id: 3, name: "City Garden", city: "Durham" }
];

let events = [
  { id: 101, title: "Live Music Night", placeId: 1 },
  { id: 102, title: "Tech Meetup 2025", placeId: 2 },
  { id: 103, title: "Yoga in the Park", placeId: 3 }
];

app.get('/api/places', (req, res) => {
  res.status(200).json(places.map(p => ({ id: p.id, name: p.name })));
});

app.get('/api/places/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
  const place = places.find(p => p.id === id);
  if (!place) return res.status(404).json({ error: "Place not found" });
  const relatedEvents = events.filter(e => e.placeId === id).map(e => ({ id: e.id, title: e.title }));
  res.status(200).json({ ...place, events: relatedEvents });
});

app.post('/api/places', (req, res) => {
  const { name, city } = req.body;
  if (!name || !city) return res.status(400).json({ error: "Missing name or city" });
  const newPlace = { id: places.length + 1, name, city };
  places.push(newPlace);
  res.status(200).json({ message: "Place added successfully", id: newPlace.id });
});

app.get('/api/events', (req, res) => {
  res.status(200).json(events);
});

app.get('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
  const event = events.find(e => e.id === id);
  if (!event) return res.status(404).json({ error: "Event not found" });
  const place = places.find(p => p.id === event.placeId);
  res.status(200).json({ id: event.id, title: event.title, place });
});

app.post('/api/events', (req, res) => {
  const { title, placeId } = req.body;
  if (!title || !placeId) return res.status(400).json({ error: "Missing title or placeId" });
  const placeExists = places.some(p => p.id === placeId);
  if (!placeExists) return res.status(400).json({ error: "Invalid placeId" });
  const newEvent = { id: events.length + 101, title, placeId };
  events.push(newEvent);
  res.status(200).json({ message: "Event added successfully", id: newEvent.id });
});

app.get('/', (req, res) => {
  res.send('EventHub API is running. Visit /api/events or /api/places.');
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
module.exports = app;
