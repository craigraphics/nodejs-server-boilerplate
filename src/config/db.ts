import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('MongoDB URI is not defined in the environment variables');
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    process.exit(1);
  }
};

export default connectDB;
