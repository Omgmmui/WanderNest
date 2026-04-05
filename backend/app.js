const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const SECRET = 'mysecretkey';
const PORT = 5000;

let users = [];
let jobs = [];
let applications = [];

app.get('/', (req, res) => {
  res.send('🚀 Backend is running');
});

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), name, email, password: hashedPassword };
  users.push(user);
  res.json({ message: 'User registered ✅' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1d' });
  res.json({ message: 'Login success ✅', token });
});

app.get('/api/users', (req, res) => {
  const cleanUsers = users.map(u => ({ id: u.id, name: u.name, email: u.email, status: 'active', date: new Date(u.id) }));
  res.json(cleanUsers);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const user = { id: Date.now(), name, email, password: 'dashboard_user' };
  users.push(user);
  res.json(user);
});

app.post('/api/jobs', authMiddleware, (req, res) => {
  const { title, company, location, salary } = req.body;
  const job = { id: Date.now(), title, company, location, salary, userId: req.user.id, createdAt: new Date() };
  jobs.push(job);
  res.json({ message: 'Job posted ✅', job });
});

app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

app.post('/api/apply', authMiddleware, (req, res) => {
  const { jobId } = req.body;
  const application = { id: Date.now(), jobId, userId: req.user.id, appliedAt: new Date() };
  applications.push(application);
  res.json({ message: 'Applied successfully ✅' });
});

app.get('/api/flights/search', (req, res) => {
  const { from, to, date } = req.query;
  
  if (!from || !to) {
    return res.status(400).json({ message: 'Missing from/to params' });
  }

  const mockFlights = [
    {
      id: 1,
      airline: 'IndiGo',
      flightNumber: '6E-201',
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      departure: date ? date + 'T08:00' : '2026-04-10T08:00',
      arrival: date ? date + 'T10:30' : '2026-04-10T10:30',
      duration: '2h 30m',
      stops: 0,
      price: 4599,
      class: 'Economy',
    },
    {
      id: 2,
      airline: 'Air India',
      flightNumber: 'AI-995',
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      departure: date ? date + 'T12:00' : '2026-04-10T12:00',
      arrival: date ? date + 'T14:30' : '2026-04-10T14:30',
      duration: '2h 30m',
      stops: 0,
      price: 5299,
      class: 'Economy',
    },
    {
      id: 3,
      airline: 'Emirates',
      flightNumber: 'EK-524',
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      departure: date ? date + 'T18:00' : '2026-04-10T18:00',
      arrival: date ? date + 'T21:00' : '2026-04-10T21:00',
      duration: '3h',
      stops: 0,
      price: 12999,
      class: 'Business',
    },
    {
      id: 4,
      airline: 'SpiceJet',
      flightNumber: 'SG-108',
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      departure: date ? date + 'T06:00' : '2026-04-10T06:00',
      arrival: date ? date + 'T08:45' : '2026-04-10T08:45',
      duration: '2h 45m',
      stops: 1,
      price: 3299,
      class: 'Economy',
    },
  ];

  res.json({ flights: mockFlights, count: mockFlights.length });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Server running on port ' + PORT);
});
