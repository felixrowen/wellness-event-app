/* eslint-disable no-console */
import { connectDatabase } from "./database/connection";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger_output.json";
import { config } from "./config";
import routes from "./routes";
import { errorHandler } from "./middlewares";
import eventService from "./services/event.service";

async function init() {
  try {
    await connectDatabase();

    const app = express();

    app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "https://wellness-event-app.vercel.app",
          "https://*.vercel.app",
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
