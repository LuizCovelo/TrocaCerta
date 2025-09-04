const express = require('express');
const auth = require('../middleware/auth');
const db = require('../config/database');
const router = express.Router();

// Get user notifications
router.get('/', auth, async (req, res) => {
    try {
        const notifications = await db('notifications')
            .where({ user_id: req.user.userId })
            .orderBy('created_at', 'desc')
            .limit(50);

        res.json(notifications);
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Mark notification as read
router.put('/mark-read/:id', auth, async (req, res) => {
    try {
        const updated = await db('notifications')
            .where({ id: req.params.id, user_id: req.user.userId })
            .update({ read: true, updated_at: db.fn.now() });

        if (!updated) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error('Mark read error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
