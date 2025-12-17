# Routes Debugging Guide

## If you're getting 404 errors for /api/doctors or /api/medicines:

### Step 1: Restart Your Server
**IMPORTANT**: After adding new routes, you MUST restart your Node.js server.

1. Stop the server (Ctrl+C in the terminal where it's running)
2. Start it again: `npm start` or `node index.js`

### Step 2: Check Server Console on Startup

When the server starts, you should see:
```
✓ Doctor routes loaded
✓ Medicine routes loaded
✓ Doctor routes registered at /api/doctors
✓ Medicine routes registered at /api/medicines
Connection has been established successfully.
Database synced successfully.
Server is running on port 5000
```

If you see errors instead, that's the problem.

### Step 3: Test the Routes

Open in your browser:
- `http://localhost:5000/api/test-routes` - Should return JSON with a message
- `http://localhost:5000/api/doctors?specialty=Cardiology` - Should return doctors data
- `http://localhost:5000/api/medicines?category=Diabetes Care&location=Delhi` - Should return medicines data

### Step 4: Check Server Logs

When you make a request, check the server console for:
```
Fetching doctors with params: { location: undefined, specialty: 'Cardiology' }
Where clause: { specialty: 'Cardiology' }
Found X doctors
```

### Common Issues:

1. **Server not restarted** - Most common cause of 404 errors
2. **Routes file has syntax error** - Check server console on startup
3. **Model file has error** - Check if Doctor/Medicine models load correctly
4. **Database connection error** - Check if sequelize.authenticate() succeeds

