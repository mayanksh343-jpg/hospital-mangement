import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
};
export default dbConnection;