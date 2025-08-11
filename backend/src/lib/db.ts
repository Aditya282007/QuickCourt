import mongoose = require('mongoose');

export const connectMongo = async (uri: string) => {
  if (!uri) throw new Error('Missing MongoDB URI');
  await mongoose.connect(uri);
  mongoose.connection.on('connected', () => console.log('MongoDB connected'));
  mongoose.connection.on('error', (err) => console.error('MongoDB error', err));
};