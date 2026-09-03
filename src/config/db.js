import mongoose from 'mongoose';

export async function connectDB(uri) {
  if (!uri) {
    console.warn('MONGO_URI not provided — skipping DB connection (dev fallback).');
    return false;
  }
  try {
    await mongoose.connect(uri, {
      // options: mongoose 7+ uses sensible defaults
    });
    console.log('MongoDB connected');
    return true;
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    return false;
  }
}
