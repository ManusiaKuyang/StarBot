import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';
import { config } from '../config/config.js';

export async function connectDatabase(): Promise<void> {
  // Bind connection event listeners for tracking connectivity
  mongoose.connection.on('connected', () => {
    logger.success('Database connected successfully (MongoDB).');
  });

  mongoose.connection.on('error', (err) => {
    logger.error('Database connection error occurred:', err);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warning('Database connection to MongoDB was lost/disconnected.');
  });

  mongoose.connection.on('reconnected', () => {
    logger.success('Database successfully reconnected to MongoDB.');
  });

  try {
    logger.info('Connecting to MongoDB...');
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.databaseUrl);
  } catch (error) {
    logger.error('Failed to initiate MongoDB connection:', error);
    throw error;
  }
}
