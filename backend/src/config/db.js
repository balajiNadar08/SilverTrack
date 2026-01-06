import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URI);
    console.log("DATABASE connected successfully.");
  } catch (error) {
    console.error("Database failed to connect: ", error.message);
    process.exit(1);
  }
}

export default connectDB;