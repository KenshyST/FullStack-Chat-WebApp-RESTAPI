import moongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await moongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};
