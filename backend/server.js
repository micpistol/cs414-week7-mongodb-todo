const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enhanced Security Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3002',
  credentials: true,
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' })); // Prevent large payload attacks
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Comprehensive Security Headers
app.use((req, res, next) => {
  // Content Security
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Transport Security
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // Additional Security Headers
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Remove server information
  res.removeHeader('X-Powered-By');
  
  next();
});

// MongoDB Connection with Enhanced Security
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is required');
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      maxPoolSize: 10,
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Enhanced Todo Schema with Better Validation
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Todo text is required'],
    trim: true,
    minlength: [1, 'Todo text must be at least 1 character'],
    maxlength: [500, 'Todo text cannot exceed 500 characters'],
    validate: {
      validator: function(v) {
        // Prevent XSS attempts and malicious content
        const dangerousPatterns = /<script|javascript:|data:|vbscript:|onload|onerror|onclick/i;
        return !dangerousPatterns.test(v);
      },
      message: 'Todo text contains potentially dangerous content'
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add text index for search functionality
todoSchema.index({ text: 'text' });

const Todo = mongoose.model('Todo', todoSchema);

// Enhanced API Routes with Comprehensive Error Handling

// GET /api/todos - Fetch all todos from MongoDB
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    
    // Don't expose internal error details to client
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Invalid request data' });
    }
    
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST /api/todos - Create new todo in MongoDB
app.post('/api/todos', async (req, res) => {
  try {
    const { text } = req.body;
    
    // Enhanced input validation
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Todo text must be a string' });
    }
    
    if (text.trim().length === 0) {
      return res.status(400).json({ error: 'Todo text cannot be empty' });
    }
    
    if (text.length > 500) {
      return res.status(400).json({ error: 'Todo text cannot exceed 500 characters' });
    }
    
    // Sanitize input
    const sanitizedText = text.trim().replace(/[<>]/g, '');
    
    const newTodo = new Todo({ text: sanitizedText });
    const savedTodo = await newTodo.save();
    
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validationErrors 
      });
    }
    
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// DELETE /api/todos/:id - Delete todo from MongoDB
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Enhanced ID validation
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid todo ID format' });
    }
    
    const deletedTodo = await Todo.findByIdAndDelete(id);
    
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Enhanced Health check endpoint
app.get('/health', (req, res) => {
  const healthStatus = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    memory: process.memoryUsage(),
    version: process.version
  };
  
  res.json(healthStatus);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Enhanced Global Error Handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  
  // Don't expose internal error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: 'Invalid request data' });
  }
  
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  
  if (error.name === 'MongoError' && error.code === 11000) {
    return res.status(409).json({ error: 'Duplicate entry' });
  }
  
  res.status(500).json({ 
    error: 'Internal server error',
    ...(isDevelopment && { details: error.message })
  });
});

// Start server with enhanced error handling
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Enhanced Secure Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🎯 API endpoints:`);
      console.log(`   GET  /api/todos - Fetch all todos`);
      console.log(`   POST /api/todos - Create new todo`);
      console.log(`   DELETE /api/todos/:id - Delete todo`);
      console.log(`🔒 Security features enabled:`);
      console.log(`   ✅ Environment variables`);
      console.log(`   ✅ Input validation & sanitization`);
      console.log(`   ✅ CORS configuration`);
      console.log(`   ✅ Security headers`);
      console.log(`   ✅ Error handling`);
      console.log(`   ✅ MongoDB connection security`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

