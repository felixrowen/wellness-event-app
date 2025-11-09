import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

async function init() {
  try {
    const PORT = 3000;
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Server is running",
        data: null,
      });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
