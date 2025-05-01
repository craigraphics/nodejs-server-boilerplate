import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import errorHandler from './middleware/errorHandler';
import itemRoutes from './routes/itemRoutes';

const app: Application = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Prevent NoSQL injection
app.use(mongoSanitize());

// Mount routes
app.use('/api/items', itemRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use(errorHandler);

export default app;
