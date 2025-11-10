import dotenv from "dotenv";

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3001"),

  database: {
    url: process.env.DATABASE_URL || "",
    name: process.env.DB_NAME || "mhc-wellness-db",
  },

  cors: {
    origin: process.env.CLIENT_HOST || "http://localhost:3001",
  },

  secret: process.env.SECRET || "",
};
