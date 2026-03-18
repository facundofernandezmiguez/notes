const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ code: '' }));
}

// GET - retrieve stored code
app.get('/api/code', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(data);
  } catch (err) {
    res.json({ code: '' });
  }
});

// POST - save code
app.post('/api/code', (req, res) => {
  try {
    const { code } = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify({ code }));
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Code clipboard running at http://localhost:${PORT}`);
});
