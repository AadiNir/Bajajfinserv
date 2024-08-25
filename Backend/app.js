const express = require('express');
const app = express();
const cors = require('cors');

// Middleware to parse JSON requests
app.use(express.json());
const allowedOrigins = ['https://bajajfinserv-63fb-97wuwlta7-aadinirs-projects.vercel.app/', 'http://localhost:3001'];

app.use(cors());
  app.get('/', (req, res) => {
    res.json("hello world" );
});
// Helper function to process the data
const processData = (data) => {
    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (/[a-z]/.test(item)) {
                if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    return { numbers, alphabets, highestLowercaseAlphabet: highestLowercaseAlphabet || "" };
};

// POST route to handle input and return processed data
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


// GET route to return operation_code
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Start the server
app.listen(3001, () => {
    console.log(`Server running on port `);
});
