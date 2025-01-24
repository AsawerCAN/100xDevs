import mongoose from "mongoose";
import "dotenv/config";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log("Error Connecting MongoDB", error);
    process.exit(1);
  }
};

export default connectToMongoDB;
