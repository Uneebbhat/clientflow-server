import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(e.message);
  }
};

export default dbConnect;
