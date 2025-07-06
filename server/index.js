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
const app= express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', appointmentRoutes);
app.use('/api/lab-tests', labRoutes);
app.use('/api', medicineRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/',(req,res)=>{
    res.send("Hello, the app is running ")
})

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
