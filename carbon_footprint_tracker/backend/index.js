const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');


require('dotenv').config();

const connectDB = require('./config/database');
// const { initializeAchievements } = require('./utils/achievementsCalculator');

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));



app.use('/api/users', require('./router/user'));
app.use('/api/activities', require('./router/activity'));
app.use('/api/goals', require('./router/goal'));
app.use('/api/achievements', require('./router/achievement'));


app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('❌ Server startup error:', error);
    }
});