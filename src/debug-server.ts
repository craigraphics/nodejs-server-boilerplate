import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable detailed request logging
app.use((req, res, next) => {
  console.log('------------------------------');
  console.log(`${new Date().toISOString()}`);
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));

  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }

  const originalSend = res.send;
  res.send = function (body) {
    console.log(`Response Status: ${res.statusCode}`);
    console.log(`Response Body: ${body}`);
    console.log('------------------------------');
    return originalSend.call(this, body);
  };

  next();
});

// Enable CORS with all options
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  })
);

// Explicitly handle OPTIONS requests
app.options('*', cors());

// Body parser middleware
app.use(express.json());

// Test routes that should work regardless of MongoDB connection
app.get('/debug/test', (req, res) => {
  res.status(200).json({ message: 'Debug test route working!' });
});

app.post('/debug/echo', (req, res) => {
  res.status(200).json({
    message: 'Echo test route working!',
    receivedData: req.body,
    headers: req.headers,
  });
});

// MongoDB connection status check
app.get('/debug/db-status', async (req, res) => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      return res.status(500).json({
        status: 'error',
        message: 'MongoDB URI is not defined in environment variables',
      });
    }

    // Check current connection status
    const status = mongoose.connection.readyState;
    let statusText = 'unknown';

    switch (status) {
      case 0:
        statusText = 'disconnected';
        break;
      case 1:
        statusText = 'connected';
        break;
      case 2:
        statusText = 'connecting';
        break;
      case 3:
        statusText = 'disconnecting';
        break;
    }

    if (status !== 1) {
      // Try to connect
      console.log('Attempting to connect to MongoDB...');
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB successfully!');
      statusText = 'connected';
    }

    return res.status(200).json({
      status: 'success',
      dbStatus: statusText,
      connectionString: mongoUri.replace(/mongodb(\+srv)?:\/\/[^:]+:([^@]+)@/, (match, p1) => `mongodb${p1 || ''}://<username>:***@`),
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Debug server running on port ${PORT}`);
  console.log(`Try these endpoints:`);
  console.log(`  GET  http://localhost:${PORT}/debug/test`);
  console.log(`  POST http://localhost:${PORT}/debug/echo`);
  console.log(`  GET  http://localhost:${PORT}/debug/db-status`);
});
