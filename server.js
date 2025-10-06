const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Calculator endpoint with advanced math support
app.post('/calculate', (req, res) => {
  const { expression } = req.body;
  
  try {
    // Safely evaluate the expression
    // This supports Math functions like Math.sqrt, Math.PI, Math.sin, etc.
    const result = Function('"use strict"; return (' + expression + ')')();
    
    // Handle special cases
    if (isNaN(result)) {
      res.status(400).json({ error: 'Invalid calculation' });
    } else if (!isFinite(result)) {
      res.status(400).json({ error: 'Math error (division by zero or infinity)' });
    } else {
      res.json({ result: Math.round(result * 1000000000) / 1000000000 }); // Round to 9 decimal places
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Advanced Calculator API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});