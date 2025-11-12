/* eslint-disable no-console */
import { connectDatabase } from "./database/connection";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "./config";
import routes from "./routes";
import { errorHandler } from "./middlewares";
import eventService from "./services/event.service";
import { setupSwagger } from "./utils/swagger.util";

async function init() {
  try {
    await connectDatabase();

    const app = express();

    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const swagger = setupSwagger();
    app.use("/api-docs", swagger.serve, swagger.setup);

    app.use("/api", routes);
    app.use(errorHandler);

    setInterval(
      async () => {
        try {
          await eventService.updateEventStatuses();
        } catch (error) {
          console.error("Error updating event statuses:", error);
        }
      },
      60 * 60 * 1000
    ); // 1 HR

    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

init();
