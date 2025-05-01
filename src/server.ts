import connectDB from './config/db';
import dotenv from 'dotenv';
import app from './app';

// Load environment variables
dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
