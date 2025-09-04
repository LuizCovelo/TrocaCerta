const express = require('express');
const Joi = require('joi');
const db = require('../config/database');
const auth = require('../middleware/auth');
const router = express.Router();

// Validation schema
const vehicleSchema = Joi.object({
    brand: Joi.string().min(1).max(50).required(),
    model: Joi.string().min(1).max(50).required(),
    year: Joi.number().integer().min(1990).max(2030).required(),
    mileage: Joi.number().integer().min(0).required(),
    plate: Joi.string().min(7).max(10).required(),
    color: Joi.string().max(30),
    last_oil_change: Joi.date()
});

// Get all vehicles for user
router.get('/', auth, async (req, res) => {
    try {
        const vehicles = await db('vehicles')
            .where({ user_id: req.user.userId })
            .orderBy('created_at', 'desc');

        res.json(vehicles);
    } catch (error) {
        console.error('Get vehicles error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get single vehicle
router.get('/:id', auth, async (req, res) => {
    try {
        const vehicle = await db('vehicles')
            .where({ id: req.params.id, user_id: req.user.userId })
            .first();

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.json(vehicle);
    } catch (error) {
        console.error('Get vehicle error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create vehicle
router.post('/', auth, async (req, res) => {
    try {
        const { error } = vehicleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Check user plan limits
        const user = await db('users').where({ id: req.user.userId }).first();
        const vehicleCount = await db('vehicles').where({ user_id: req.user.userId }).count('* as count');

        if (user.plan === 'free' && vehicleCount[0].count >= 1) {
            return res.status(403).json({ message: 'Free plan allows only 1 vehicle' });
        }

        if (user.plan === 'basic' && vehicleCount[0].count >= 3) {
            return res.status(403).json({ message: 'Basic plan allows up to 3 vehicles' });
        }

        const [vehicleId] = await db('vehicles').insert({
            ...req.body,
            user_id: req.user.userId,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
        }).returning('id');

        const newVehicle = await db('vehicles').where({ id: vehicleId.id }).first();

        res.status(201).json(newVehicle);
    } catch (error) {
        console.error('Create vehicle error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update vehicle
router.put('/:id', auth, async (req, res) => {
    try {
        const { error } = vehicleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updated = await db('vehicles')
            .where({ id: req.params.id, user_id: req.user.userId })
            .update({
                ...req.body,
                updated_at: db.fn.now()
            });

        if (!updated) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        const vehicle = await db('vehicles').where({ id: req.params.id }).first();
        res.json(vehicle);
    } catch (error) {
        console.error('Update vehicle error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete vehicle
router.delete('/:id', auth, async (req, res) => {
    try {
        const deleted = await db('vehicles')
            .where({ id: req.params.id, user_id: req.user.userId })
            .del();

        if (!deleted) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        console.error('Delete vehicle error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
