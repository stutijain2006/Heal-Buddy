const express= require('express');
const router= express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const MedicineOrder = require('../models/MedicineOrder');
const upload= require('../middleware/upload');

router.post('/medicine-orders', verifyToken, upload.single('prescription'), async (req, res) => {
    try{
        const { medicines, quantity, deliveryAddress } = req.body;
        const prescriptionUrl= req.file ? '/uploads/' + req.file.filename : null;
        const order= await MedicineOrder.create({ prescriptionUrl, medicines, quantity, deliveryAddress, userId: req.user.id, status: 'pending' });
        res.status(201).json(order);
    }catch(error){
        res.status(500).json({ message: 'Error creating medicine order' });
    }
});

router.get('/medicine-orders', verifyToken, async (req, res) => {
    try{
        const orders= await MedicineOrder.findAll({ where: { userId: req.user.id } });
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({ message: 'Error fetching medicine orders' });
    }
});

router.get('/admin/medicine-orders', verifyToken, isAdmin, async (req, res) => {
    try{
        const orders= await MedicineOrder.findAll();
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({ message: 'Error fetching medicine orders' });
    }
});

router.put('/admin/medicine-orders/:id', verifyToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { status, resultUrl } = req.body;
    try {
        const order = await MedicineOrder.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Medicine order not found' });
        }
        if (status) {
            order.status = status;
        }
        if (resultUrl) {
            order.resultUrl = resultUrl;
        }
        await order.save();
        res.status(200).json({ message: 'Medicine order updated successfully', order });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating medicine order' });
    }
})

module.exports= router;

