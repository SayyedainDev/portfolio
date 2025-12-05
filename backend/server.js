import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import contactRoutes from './routes/contact.js';
import errorHandler from './middleware/errorHandler.js';

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api', contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server (only in development, Vercel handles production)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Portfolio Backend Server                         ║
║                                                       ║
║   Server running on: http://localhost:${PORT}          ║
║   Environment: ${process.env.NODE_ENV || 'development'}                      ║
║   Timestamp: ${new Date().toLocaleString()}            ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
    `);
  });
}

export default app;
