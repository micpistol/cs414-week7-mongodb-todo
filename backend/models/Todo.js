const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Todo text is required'],
    trim: true,
    minlength: [1, 'Todo text must be at least 1 character long'],
    maxlength: [500, 'Todo text cannot exceed 500 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add index for better query performance
todoSchema.index({ text: 'text' });

// Pre-save middleware to update the updatedAt field
todoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Instance method to mark todo as complete
todoSchema.methods.toggleComplete = function() {
  this.completed = !this.completed;
  return this.save();
};

// Static method to get todos by completion status
todoSchema.statics.findByStatus = function(completed) {
  return this.find({ completed: completed });
};

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
