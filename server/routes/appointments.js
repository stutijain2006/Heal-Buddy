const express= require('express');
const router= express.Router();
const Appointment= require('../models/appointment');
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
        const appointments = await Appointment.findAll();
        res.status(200).json({ appointments });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching appointments' });
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