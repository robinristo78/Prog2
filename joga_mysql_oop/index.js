
// Import the Express framework for building web applications
const express = require('express');

// Import the database connection from the utils/db.js file
const db = require('./utils/db');


// Create an instance of the Express application
const app = express();

// Define the port number where the server will listen for requests
const PORT = 3000;


// Define a route handler for the root URL ('/')
// This handler executes a simple SQL query and returns the result as JSON
app.get('/', async (req, res) => {
    try {
        // Execute a SQL query to calculate 1 + 1 and return the result
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        // Send the result as a JSON response
        res.json({ result: rows[0].solution });
    } catch (err) {
        // If an error occurs, send a 500 status and the error message
        res.status(500).json({ error: err.message });
    }
});


// Start the Express server and listen on the specified port
// Log a message to the console when the server is running
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});