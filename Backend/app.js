const express = require('express');
const cors = require('cors');
const app = express();

// List of allowed origins
const allowedOrigins = [
    'https://bajajfinserv-63fb-flqsgxroy-aadinirs-projects.vercel.app', // Add your new frontend origin here
    'https://bajajfinserv-licy-od2jgxy79-aadinirs-projects.vercel.app', // Existing backend origin
    'http://localhost:3001' // Localhost for development
];

// CORS middleware configuration
app.use(cors({
    origin: allowedOrigins,
    credentials: true ,
    optionsSuccessStatus: 200
  }));
// Middleware to parse JSON requests
app.use(express.json());

// Example POST route
app.post('/bfhl', (req, res) => {
    console.log('Request Body:', req.body);

    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const { numbers, alphabets, highestLowercaseAlphabet } = processData(data);

    res.json({
        is_success: true,
        user_id: "aadithya niranjan",
        email: "aadiniranjan27@gmail.com",
        roll_number: "21BLC1531",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

// Start the server
app.listen(3001, () => {
    console.log(`Server running on port 3001`);
});
