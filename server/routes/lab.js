const express = require('express');
const router = express.Router();
const LabTest = require('../models/LabTest');
const User = require('../models/user');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/book', verifyToken, async (req, res) => {
    try {
        const { testName, testDate, timeSlot, mode } = req.body;
        
        // Validate and parse the date
        let parsedDate;
        if (testDate) {
            parsedDate = new Date(testDate);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json({ message: 'Invalid date format' });
            }
        } else {
            // Default to tomorrow if no date provided
            parsedDate = new Date();
            parsedDate.setDate(parsedDate.getDate() + 1);
        }
        
        const test = await LabTest.create({
            testName,
            mode,
            testDate: parsedDate,
            timeSlot,
            status: 'pending',
            userId: req.user.id
        });
        res.status(201).json(test);
    } catch (error) {
        console.error('Error booking lab test:', error);
        res.status(500).json({ message: 'Error booking lab test', error: error.message });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const tests = await LabTest.findAll({ where: { userId: req.user.id } });
        res.status(200).json(tests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching lab tests' });
    }
});

router.get('/admin', verifyToken, isAdmin, async (req, res) => {
    try {
        const tests = await LabTest.findAll({
            include: [{
                model: User,
                attributes: ['id', 'fullname', 'email', 'mobile']
            }],
            order: [['createdAt', 'ASC']] // Will be resorted
        });
        // Custom sort: pending first, then by oldest first within pending
        const sortedTests = tests.sort((a, b) => {
            if (a.status === 'pending' && b.status !== 'pending') return -1;
            if (a.status !== 'pending' && b.status === 'pending') return 1;
            if (a.status === 'pending' && b.status === 'pending') {
                return new Date(a.createdAt) - new Date(b.createdAt); // oldest first
            }
            return new Date(b.createdAt) - new Date(a.createdAt); // newest first for others
        });
        res.status(200).json(sortedTests);
    } catch (error) {
        console.error('Error fetching lab tests:', error);
        res.status(500).json({ message: 'Error fetching lab tests', error: error.message });
    }
});

router.put('/admin/:id', verifyToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { status, resultUrl } = req.body;
    try {
        const test = await LabTest.findByPk(id);
        if (!test) {
            return res.status(404).json({ message: 'Lab test not found' });
        }
        if (status) test.status = status;
        if (resultUrl) test.resultUrl = resultUrl;
        await test.save();
        res.status(200).json({ message: 'Lab test updated successfully', test });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating lab test' });
    }
});

module.exports = router;
