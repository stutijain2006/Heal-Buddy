const express= require('express');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const router= express.Router();
const User = require('../models/user');
const JWT_SECRET= process.env.JWT_SECRET;
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/register', async (req, res) => {
    console.log("Registration received successful")
    const { fullname, email, password, mobile , referralCode} = req.body;
    try {
        if (referralCode){
            console.log("Referral Code received: ", referralCode);
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const existingMobile = await User.findOne({ where: { mobile } });
        if (existingMobile) {
            return res.status(400).json({ message: 'Mobile number already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ fullname, email, password: hashedPassword, mobile });
        const token= jwt.sign({ userId: user.id , role: user.role}, JWT_SECRET, { expiresIn: '2h' });
        res.status(201).json({ message: 'User registered successfully',token, user: { id: user.id, fullname: user.fullname, email: user.email, mobile: user.mobile} });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin || false, role: user.role || 'user' }, JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({ token, user: { id: user.id, isAdmin: user.isAdmin, fullname: user.fullname, email: user.email, mobile: user.mobile} });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
})

router.get('/profile', verifyToken, async(req, res) => {
    try{
        const user= await User.findByPk(req.user.id, {
            attributes: ['fullname', 'email', 'mobile', 'address', 'role', 'createdAt']
        });
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({ message: 'Error fetching user profile' });
    }
});

router.put('/profile', verifyToken, async (req, res) => {
    try{
        const { fullname, email, mobile, address } = req.body;
        const user= await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.fullname= fullname;
        user.email= email;
        user.mobile= mobile;
        user.address= address;
        await user.save();
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({ message: 'Error updating user profile' });
    }
})

router.get('/admin', verifyToken, isAdmin, (req, res) => {
    res.json({
        message: 'Admin route',
        user: req.user
    });
});


module.exports = router;