const express = require('express');
const auth = require('../middleware/auth');
const db = require('../config/database');
const router = express.Router();

// Get all maintenances for user vehicles
router.get('/', auth, async (req, res) => {
    try {
        const maintenances = await db('maintenances')
            .join('vehicles', 'maintenances.vehicle_id', 'vehicles.id')
            .where('vehicles.user_id', req.user.userId)
            .select('maintenances.*', 'vehicles.brand', 'vehicles.model', 'vehicles.year')
            .orderBy('maintenances.due_date', 'asc');

        res.json(maintenances);
    } catch (error) {
        console.error('Get maintenances error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create maintenance record
router.post('/', auth, async (req, res) => {
    try {
        const { vehicle_id, type, description, due_date, due_mileage } = req.body;

        // Verify vehicle belongs to user
        const vehicle = await db('vehicles')
            .where({ id: vehicle_id, user_id: req.user.userId })
            .first();

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        const [maintenanceId] = await db('maintenances').insert({
            vehicle_id,
            type,
            description,
            due_date,
            due_mileage,
            status: 'pending',
            created_at: db.fn.now(),
            updated_at: db.fn.now()
        }).returning('id');

        const newMaintenance = await db('maintenances')
            .where({ id: maintenanceId.id })
            .first();

        res.status(201).json(newMaintenance);
    } catch (error) {
        console.error('Create maintenance error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
