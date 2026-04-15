const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// === MIDDLEWARE (Security & Logging) ===
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// === MOCK DATABASE ===
const users = [
  { id: 1, name: 'Umer', role: 'Admin' },
  { id: 2, name: 'atif', role: 'Developer' },
  { id: 3, name: 'Rafay', role: 'DevOps' }
];

// === API ROUTES ===
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.get('/api/users', (req, res) => {
  res.status(200).json({ success: true, data: users });
});

app.post('/api/users', (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({ success: false, message: 'Name and role required' });
  }
  const newUser = { id: users.length + 1, name, role };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// === FRONTEND (Dashboard) ===
app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <title>DevSecOps Dashboard</title>
        <style>
          body { font-family: sans-serif; background: #0f172a; color: #e2e8f0; padding: 2rem; }
          .card { background: rgba(255,255,255,0.08); padding: 2rem; border-radius: 12px; max-width: 800px; margin: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
          h1 { margin-top: 0; color: #22d3ee; }
          button { background: #22d3ee; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-weight: bold; }
          pre { background: #1e293b; padding: 1rem; border-radius: 8px; }
          .status { display: inline-block; padding: 0.2rem 0.6rem; background: #166534; color: #4ade80; border-radius: 12px; font-size: 0.8rem; margin-bottom: 1rem; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="status">System Online (Secured)</div>
          <h1>Secure API Dashboard</h1>
          <p>Welcome to the upgraded DevSecOps API. Features security headers (Helmet), logging (Morgan), and a RESTful structure.</p>
          <hr style="border:1px solid #334155; margin: 2rem 0;">
          <h2>API Test Panel</h2>
          <button onclick="fetchUsers()">Fetch Users (/api/users)</button>
          <pre id="api-output">Click the button to fetch live API data...</pre>
        </div>
        <script>
          async function fetchUsers() {
            const output = document.getElementById('api-output');
            output.textContent = 'Loading...';
            try {
              const res = await fetch('/api/users');
              const data = await res.json();
              output.textContent = JSON.stringify(data, null, 2);
            } catch (err) {
              output.textContent = 'Error fetching data: ' + err.message;
            }
          }
        </script>
      </body>
    </html>
  `);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[SERVER] Secured App running on port ${PORT}`);
  });
}

module.exports = app;
