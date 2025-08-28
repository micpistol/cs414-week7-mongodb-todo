# Environment Setup Guide

## Required Environment Variables

Create a `.env` file in the backend directory with the following variables:

```bash
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/todo_app

# Server Configuration
PORT=3001
NODE_ENV=development

# Security
CORS_ORIGIN=http://localhost:3002
```

## MongoDB Setup Options

### Option 1: Local MongoDB Installation

1. **Install MongoDB Community Edition:**
   - macOS: `brew install mongodb-community`
   - Windows: Download from [MongoDB website](https://www.mongodb.com/try/download/community)
   - Linux: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB service:**
   - macOS: `brew services start mongodb-community`
   - Windows: MongoDB runs as a service
   - Linux: `sudo systemctl start mongod`

3. **Verify connection:**
   ```bash
   mongosh
   # or
   mongo
   ```

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create free account** at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create a new cluster** (free tier available)
3. **Set up database access** with username/password
4. **Set up network access** (allow your IP or 0.0.0.0/0 for development)
5. **Get connection string** and update your `.env` file:

```bash
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/todo_app
```

## Security Notes

- **NEVER commit your `.env` file** to version control
- **Use strong passwords** for MongoDB Atlas
- **Restrict network access** in production
- **Use environment-specific configurations** for different deployment stages

## Testing the Connection

After setting up MongoDB and your `.env` file:

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Check the console output** for successful MongoDB connection
3. **Test the health endpoint:**
   ```bash
   curl http://localhost:3001/health
   ```

## Troubleshooting

### Common Issues:

1. **"MongoDB connection failed"**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Check network access (for Atlas)

2. **"Port already in use"**
   - Change PORT in `.env` file
   - Kill existing process using the port

3. **"CORS errors"**
   - Verify CORS_ORIGIN in `.env`
   - Check frontend URL matches backend CORS settings
