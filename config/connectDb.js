import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database conected ");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export default connectDb;
