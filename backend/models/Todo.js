const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Todo text is required'],
        trim: true,
        minlength: [1, 'Todo cannot be empty']
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Tự động tạo createdAt và updatedAt
});

module.exports = mongoose.model('Todo', todoSchema);
