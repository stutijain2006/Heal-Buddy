const express= require('express');
const cors= require('cors');
const dotenv= require('dotenv');
const sequelize = require('./config/db');
const User= require('./models/user');
const authRoutes= require('./routes/auth');
const Appointment= require('./models/appointment');
const appointmentRoutes= require('./routes/appointments');
const LabTest= require('./models/LabTest');
const labRoutes= require('./routes/lab');
const MedicineOrder = require('./models/MedicineOrder');
const medicineRoutes= require('./routes/medicine');
const Doctor = require('./models/doctor');
const Medicine = require('./models/medicine');

// Load routes with error handling
let doctorRoutes, medicinesRoutes;
try {
    doctorRoutes = require('./routes/doctors');
    console.log('✓ Doctor routes loaded');
} catch (error) {
    console.error('✗ Error loading doctor routes:', error);
}

try {
    medicinesRoutes = require('./routes/medicines');
    console.log('✓ Medicine routes loaded');
} catch (error) {
    console.error('✗ Error loading medicine routes:', error);
}

const app= express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', appointmentRoutes);
app.use('/api/lab-tests', labRoutes);
app.use('/api', medicineRoutes);

// Register new routes if loaded successfully
if (doctorRoutes) {
    app.use('/api', doctorRoutes);
    console.log('✓ Doctor routes registered at /api/doctors');
}
if (medicinesRoutes) {
    app.use('/api', medicinesRoutes);
    console.log('✓ Medicine routes registered at /api/medicines');
}

app.use('/uploads', express.static('uploads'));

// Test route to verify server is working
app.get('/',(req,res)=>{
    res.send("Hello, the app is running ")
})

// Debug route to list all registered routes
app.get('/api/test-routes', (req, res) => {
    res.json({ 
        message: 'Routes are working',
        timestamp: new Date().toISOString()
    });
});

PORT= process.env.PORT ||5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

sequelize.sync({alter: true}).then(() => {
    console.log('Database synced successfully.');
}).catch(err => {
    console.error('Error syncing database:', err);
});
