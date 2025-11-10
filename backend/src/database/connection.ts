import mongoose from "mongoose";
import { config } from "../config";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.database.url, {
      dbName: config.database.name,
    });
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};
