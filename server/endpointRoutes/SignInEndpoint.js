const express = require('express');
const bcrypt = require('bcryptjs');
const Members = require('../models/membersModel'); // Make sure to replace this with the correct path

const router = express.Router();

router.post('/api/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Please provide both username and password.' });
        }

        const user = await Members.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Here you would typically assign a token or create a session
        // For this example, let's just return a success message
        res.status(200).json({ message: 'User signed in successfully.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

module.exports = router;
