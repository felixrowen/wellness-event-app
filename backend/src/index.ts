import { connectDatabase } from "./database/connection";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "./config";
import routes from "./routes";
import { errorHandler } from "./middlewares";

async function init() {
  try {
    await connectDatabase();

    const app = express();

    app.use(
      cors({
        origin: config.cors.origin,
      })
    );

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api", routes);

    app.use(errorHandler);

    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

init();
