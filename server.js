const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Calculator endpoint
app.post('/calculate', (req, res) => {
  const { expression } = req.body;
  
  try {
    const result = Function('"use strict"; return (' + expression + ')')();
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Calculator API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});