const express = require('express');
const auth = require('../middleware/auth');
const db = require('../config/database');
const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await db('users')
            .select('id', 'name', 'email', 'plan', 'created_at')
            .where({ id: req.user.userId })
            .first();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, email } = req.body;

        const updated = await db('users')
            .where({ id: req.user.userId })
            .update({
                name,
                email,
                updated_at: db.fn.now()
            });

        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = await db('users')
            .select('id', 'name', 'email', 'plan', 'created_at')
            .where({ id: req.user.userId })
            .first();

        res.json(user);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
