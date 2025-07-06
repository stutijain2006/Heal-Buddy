const jwt= require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET= process.env.JWT_SECRET || 'your_secret_key';

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = {
            id: user.id,
            isAdmin: user.isAdmin,
            role: user.role,
            email: user.email
        };
        next();
    } 
    catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

const isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

module.exports= {verifyToken, isAdmin};