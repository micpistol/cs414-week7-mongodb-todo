# 🚀 Enhanced Full Stack Todo Application - CS 414

## Assignment Overview
**Week 6: Data and Model Management with MongoDB Integration**

This project demonstrates a **production-ready full-stack web application** with a React frontend, Express.js backend, and MongoDB database. The application includes comprehensive security features, error handling, and modern development practices.

## 🎯 Enhanced Features

### ✅ **Core Assignment Requirements Met**
- **View existing tasks** - Display all todos from MongoDB database
- **Add new task** - Create new todos with validation and persistence
- **Delete task** - Remove todos with proper error handling
- **Full-stack architecture** - React frontend + Express backend + MongoDB
- **RESTful API** - Proper HTTP methods, status codes, and validation

### 🚀 **Advanced Features Added**
- **MongoDB Integration** - Persistent data storage with Mongoose ODM
- **Completion Status** - Toggle todo completion with visual feedback
- **Inline Editing** - Edit todos directly in the list
- **Pagination** - Handle large numbers of todos efficiently
- **Search & Filtering** - Find and organize todos by status
- **Real-time Statistics** - Visual progress tracking and completion rates
- **Responsive Design** - Mobile-first approach with modern UI/UX

### 🔒 **Security Features Implemented**
- **Environment Variables** - Secure configuration management with dotenv
- **Input Validation** - Server-side validation with Mongoose schemas
- **CORS Configuration** - Secure cross-origin resource sharing
- **Security Headers** - Protection against common web vulnerabilities
- **Error Handling** - Comprehensive error management without information leakage
- **Dependency Audits** - Regular security vulnerability checks

## 🏗️ Project Structure
```
project/
├── backend/                 # Express.js server with MongoDB
│   ├── config/             # Database configuration
│   │   └── database.js     # MongoDB connection setup
│   ├── models/             # Mongoose data models
│   │   └── Todo.js         # Todo schema with validation
│   ├── server.js           # Enhanced Express server
│   ├── package.json        # Backend dependencies
│   └── ENVIRONMENT_SETUP.md # MongoDB setup guide
├── frontend/               # React application
│   ├── src/                # React source code
│   │   ├── components/     # React components
│   │   │   ├── TodoForm.js # Add new todos
│   │   │   ├── TodoList.js # Display and manage todos
│   │   │   └── TodoStats.js # Statistics dashboard
│   │   ├── App.js          # Main application component
│   │   └── App.css         # Enhanced styling
│   └── package.json        # Frontend dependencies
├── test-integration.html   # Integration testing tool
└── README.md               # This file
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling for Node.js
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - User interface library
- **Modern CSS** - Responsive design with animations
- **Fetch API** - HTTP communication with backend
- **Component Architecture** - Modular, maintainable code

## 📋 Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- MongoDB (local installation or Atlas cloud service)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cs414-week6-todo-app.git
   cd cs414-week6-todo-app
   ```

2. **Set up MongoDB:**
   - **Local**: Install MongoDB Community Edition
   - **Cloud**: Create free MongoDB Atlas cluster
   - See `backend/ENVIRONMENT_SETUP.md` for detailed instructions

3. **Configure environment variables:**
   ```bash
   cd backend
   # Create .env file (see ENVIRONMENT_SETUP.md for template)
   cp ENVIRONMENT_SETUP.md .env
   # Edit .env with your MongoDB connection string
   ```

4. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

5. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Start the application:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| GET | `/api/todos` | Get all todos (with pagination & filtering) |
| GET | `/api/todos/:id` | Get single todo by ID |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update existing todo |
| DELETE | `/api/todos/:id` | Delete todo by ID |
| PATCH | `/api/todos/:id/toggle` | Toggle completion status |

### Advanced Query Parameters
- **Pagination**: `?page=1&limit=10`
- **Status Filter**: `?completed=true` or `?completed=false`
- **Search**: `?search=keyword`

## 🔒 Security Implementation

### Environment Variables
```bash
# .env file (never commit to version control)
MONGODB_URI=mongodb://localhost:27017/todo_app
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3002
```

### Security Features
- **Input Validation** - Mongoose schema validation
- **CORS Protection** - Configurable cross-origin access
- **Security Headers** - XSS, CSRF, and content type protection
- **Error Handling** - Secure error responses without information leakage
- **Dependency Audits** - Regular security vulnerability checks

## 🧪 Testing

### Integration Testing
Open `test-integration.html` in your browser to test:
- Backend API connectivity
- Frontend accessibility
- Full-stack integration
- CRUD operations validation

### Manual Testing
- Test all CRUD operations through the UI
- Verify error handling with invalid inputs
- Check responsive design on different screen sizes
- Test pagination and filtering features

## 📊 Features in Action

### Todo Management
- **Create** - Add new todos with validation
- **Read** - View todos with pagination and search
- **Update** - Edit todo text and toggle completion
- **Delete** - Remove todos with confirmation

### User Experience
- **Real-time Updates** - Immediate feedback on all operations
- **Visual Feedback** - Completion status, progress bars, statistics
- **Responsive Design** - Works seamlessly on all devices
- **Error Handling** - User-friendly error messages

## 🚀 Production Deployment

### Environment Configuration
- Set `NODE_ENV=production`
- Use MongoDB Atlas for cloud database
- Configure proper CORS origins
- Set up environment-specific variables

### Security Checklist
- [ ] Environment variables configured
- [ ] MongoDB access restricted
- [ ] CORS origins limited
- [ ] Security headers enabled
- [ ] Dependencies audited
- [ ] Error handling implemented

## 🔧 Development

### Available Scripts
```bash
# Backend
npm start          # Start production server
npm run dev        # Start development server with nodemon

# Frontend
npm start          # Start React development server
npm run build      # Build for production
npm test           # Run tests
```

### Code Quality
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Component Architecture** - Modular, reusable components
- **Error Boundaries** - Graceful error handling

## 📚 Learning Outcomes

This project demonstrates:
- **Full-Stack Development** - Complete application architecture
- **Database Integration** - MongoDB with Mongoose ODM
- **Security Best Practices** - Production-ready security implementation
- **Modern Web Development** - React, Express, and modern tooling
- **API Design** - RESTful API with proper error handling
- **User Experience** - Responsive design and intuitive interfaces

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of CS 414 Full Stack Web Development course.

## 🙏 Acknowledgments

- **UCLA Extension** - Course materials and guidance
- **MongoDB** - Database technology and documentation
- **Express.js** - Web framework
- **React** - Frontend library

---

**Course**: CS 414 Full Stack Web Development  
**Week**: 6 - Data and Model Management with MongoDB  

