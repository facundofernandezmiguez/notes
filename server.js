const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
let clipboardContent = '';

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// GET - retrieve stored code
app.get('/api/code', (req, res) => {
  res.json({ code: clipboardContent });
});

// POST - save code
app.post('/api/code', (req, res) => {
  clipboardContent = req.body.code || '';
  res.json({ ok: true });
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Code clipboard running at http://localhost:${PORT}`);
});
