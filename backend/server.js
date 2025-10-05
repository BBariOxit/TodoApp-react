const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully');
        console.log(`📦 Database: ${mongoose.connection.db.databaseName}`);
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });

// Routes
const todosRouter = require('./routes/todos');
app.use('/api/todos', todosRouter);

// Health check
app.get('/', (req, res) => {
    res.json({ 
        message: 'Todo API is running',
        endpoints: {
            'GET /api/todos': 'Get all todos',
            'POST /api/todos': 'Create new todo',
            'PATCH /api/todos/:id': 'Toggle todo',
            'DELETE /api/todos/:id': 'Delete todo'
        }
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 API endpoints: http://localhost:${PORT}/api/todos`);
});
