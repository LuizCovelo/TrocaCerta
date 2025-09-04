const express = require('express');
const auth = require('../middleware/auth');
const db = require('../config/database');
const router = express.Router();

// Get available plans
router.get('/', (req, res) => {
    const plans = [
        {
            id: 'free',
            name: 'Free',
            price: 0,
            currency: 'BRL',
            interval: 'month',
            features: [
                'Lembrete de troca de óleo',
                '1 veículo',
                'Notificações por email'
            ]
        },
        {
            id: 'basic',
            name: 'Básico',
            price: 5.90,
            currency: 'BRL',
            interval: 'month',
            features: [
                'Todas as funções do Free',
                'Filtros, velas, freios, bateria',
                'Até 3 veículos',
                'Suporte prioritário'
            ]
        },
        {
            id: 'premium',
            name: 'Premium',
            price: 19.90,
            currency: 'BRL',
            interval: 'month',
            features: [
                'Todas as funções do Básico',
                'Todas as manutenções',
                'Veículos ilimitados',
                'WhatsApp + Email',
                'Relatórios avançados'
            ]
        }
    ];

    res.json(plans);
});

// Subscribe to plan (mock implementation)
router.post('/subscribe', auth, async (req, res) => {
    try {
        const { plan_id } = req.body;

        if (!['free', 'basic', 'premium'].includes(plan_id)) {
            return res.status(400).json({ message: 'Invalid plan' });
        }

        await db('users')
            .where({ id: req.user.userId })
            .update({ 
                plan: plan_id,
                updated_at: db.fn.now()
            });

        res.json({ 
            message: 'Plan updated successfully',
            plan: plan_id
        });
    } catch (error) {
        console.error('Subscribe error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
