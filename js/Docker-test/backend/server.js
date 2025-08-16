const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// PostgreSQ connection pool
const pool = new Pool({
  user: process.env.PGUSER || 'myuser',
  host: process.env.PGHOST || 'postgres', // service name from docker-compose
  database: process.env.PGDATABASE || 'mydatabase',
  password: process.env.PGPASSWORD || 'mypassword',
  port: process.env.PGPORT || 5432
});

// Create donors table if not exists
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS donors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        donation_amount DECIMAL(10,2) NOT NULL
      )
    `);
    console.log("✅ Donors table ready.");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
})();

// Add donor
app.post('/addDonor', async (req, res) => {
  const { name, donationAmount } = req.body;

  if (!name || !donationAmount) {
    return res.status(400).json({ error: 'Name and donation amount are required.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO donors (name, donation_amount) VALUES ($1, $2) RETURNING *',
      [name, donationAmount]
    );
    res.status(201).json({ message: 'Donor added successfully.', donor: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error adding donor.' });
  }
});

// Get donor by ID
app.get('/getDonor/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM donors WHERE id = $1', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Donor not found.' });
    }

    res.status(200).json({ message: 'Donor retrieved successfully.', donor: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error retrieving donor.' });
  }
});

// Get all donors
app.get('/getAllDonors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM donors');
    res.status(200).json({ message: 'All donors retrieved successfully.', donors: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error retrieving donors.' });
  }
});

// Calculate total donations
app.get('/calTotalDonation', async (req, res) => {
  try {
    const result = await pool.query('SELECT SUM(donation_amount) AS total FROM donors');
    res.status(200).json({ message: 'Total donation calculated successfully.', totalDonation: result.rows[0].total || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error calculating total donation.' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Express.js + PostgreSQL!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
