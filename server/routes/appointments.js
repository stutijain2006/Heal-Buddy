const express= require('express');
const router= express.Router();
const Appointment= require('../models/appointment');
const User = require('../models/user');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/appointments', verifyToken, async (req, res) => {
    const { doctorName, appointmentDate, timeSlot } = req.body;
    try {
        const newAppointment = await Appointment.create({ userId: req.user.id, doctorName, appointmentDate, timeSlot, status: 'pending' });
        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating appointment' });
    }
})

router.get('/appointments', verifyToken, async (req, res) => {
    try {
        const appointments = await Appointment.findAll({ where: { userId: req.user.id } });
        res.status(200).json({ appointments });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching appointments' });
    }
})

router.get('/admin/appointments', verifyToken, isAdmin, async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            include: [{
                model: User,
                attributes: ['id', 'fullname', 'email', 'mobile']
            }],
            order: [
                ['status', 'ASC'], // pending first (alphabetically 'pending' comes before 'approved'/'rejected')
                ['createdAt', 'ASC'] // oldest first within each status group
            ]
        });
        // Custom sort: pending first, then by date
        const sortedAppointments = appointments.sort((a, b) => {
            if (a.status === 'pending' && b.status !== 'pending') return -1;
            if (a.status !== 'pending' && b.status === 'pending') return 1;
            if (a.status === 'pending' && b.status === 'pending') {
                return new Date(a.createdAt) - new Date(b.createdAt); // oldest first
            }
            return new Date(b.createdAt) - new Date(a.createdAt); // newest first for others
        });
        res.status(200).json({ appointments: sortedAppointments });
    } 
    catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
})

router.put('/admin/appointments/:id', verifyToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        appointment.status = status;
        await appointment.save();
        res.status(200).json({ message: 'Appointment updated successfully', appointment });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating appointment' });
    }
})

module.exports= router;