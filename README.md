# Heal Buddy- Clinic & Lab Test Management System
Heal Buddy is a full-stack web application built to streamline clinic appointment bookings, lab test management, and medicine orders.
It provides distinct interfaces for Users and Admins, secure authentication, and smooth database operations with PostgreSQL and Sequelize.

## Features
### Client/User Heading
* Register & Login securely (JWT-based authentication)
* Book doctor appointments with date & time slot selection
* Book lab tests (Vitamin-D, Blood Test, etc.) with mode (Online/Offline), test date, and slots
* Place medicine orders
* View booking history:
  - My Appointments
  - My Lab Tests
  - My Medicine Orders

### Admin Features
- Secure Admin Login (isAdmin verified)
- Manage Doctor Appointments:
  - View all appointments
  - Approve/Reject booking requests
- Manage Lab Test Bookings:
  - View all lab test orders
  - Approve/Reject tests
- Manage Medicine Orders:
  - View all orders
  - Approve/Reject orders
- Full control over user requests
- Admin-only protected API routes

## Authentication & Security
- JWT-based secure login system
- Password hashing using bcrypt
- Admin role verification using middleware (isAdmin)
- Protected API routes (verifyToken, isAdmin)

## Technology Stack
- **Frontend** - React JS, Axios, React Router DOM
- **Backend** - Node.js, Sequelize ORM, bcrypt , JWT
- **Database** - PostgreSQL, pgAdmin4

## How to test the App
You can explore different features of the section under various sections-

- ### Doctor Appointment
  - Go to the cholestrol section under the Doctor Consultation.
  - Book an appointment by selecting date and time.
  - The appointment request will be added for admin approval.
 
- ### Lab Test Booking
  - Go to the Vitamin D Test under Lab Tests.
  - Select the desired time slot and book the test.
  - The booking will appear as a pending lab test in your dashboard.
 
- ### Medicine Orders
  - Go to the Diabetes section under Medicines.
  - Place an order for medicines.
  - The order will be pending approval from the admin.


## To Run

1. Clone the repository.
2. In the server and client folder, install the dependencies using npm install.
3. Create a .env file in the /server folder based on .sample.env
4. Setup PostgreSQL Database
  - Open pgAdmin4 or any PostgreSQL Client.
  - Create a new database named heal_buddy.
  - Sequelize will generate the tables automatically when the server runs.
5. Create the First Admin User.
  - Update "Users" set "isAdmin" = true where email= 'adminemail@gmail.com';
6. From the server directory, run the backend server using **node index.js**, server runs at "localhost:5000".
7. From the client directory, run the frontend server using **npm start** , server runs at "localhost:3000".
