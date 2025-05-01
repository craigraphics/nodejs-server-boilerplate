import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Schema, model } from 'mongoose';

// Load environment variables
dotenv.config();

// Create a simple schema
interface ITest {
  name: string;
  createdAt: Date;
}

const TestSchema: Schema = new Schema<ITest>({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model
const Test = model<ITest>('Test', TestSchema);

// Connect to the database
const connectAndTest = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    // Print connection string with password hidden for debugging
    const connectionString = mongoUri.replace(/mongodb(\+srv)?:\/\/[^:]+:([^@]+)@/, (match, p1) => `mongodb${p1 || ''}://<username>:***@`);
    console.log('Connecting to MongoDB Atlas...');
    console.log(`Using connection string: ${connectionString}`);

    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB Atlas successfully!`);

    // Create a test document
    console.log('Creating a test document...');
    const testDoc = await Test.create({ name: 'Test Document' });
    console.log(`Test document created with ID: ${testDoc._id}`);

    // Find the document
    console.log('Retrieving the test document...');
    const foundDoc = await Test.findById(testDoc._id);
    console.log('Found document:', foundDoc);

    // Delete the document
    console.log('Deleting the test document...');
    await Test.deleteOne({ _id: testDoc._id });
    console.log('Test document deleted successfully');

    console.log('All operations completed successfully!');
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error occurred');

    // More detailed error information for connection issues
    if (error instanceof Error) {
      if (error.message.includes('ENOTFOUND')) {
        console.error('Host not found. Check your cluster address in the connection string.');
      } else if (error.message.includes('Authentication failed')) {
        console.error('Authentication failed. Check your username and password.');
      } else if (error.message.includes('timed out')) {
        console.error('Connection timed out. Check your network or IP whitelist settings.');
      }
    }
  } finally {
    // Close the connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('Database connection closed');
    }
  }
};

// Run the test
connectAndTest();
