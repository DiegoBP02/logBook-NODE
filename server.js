import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

// others packages
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import bp from "body-parser";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import connectDB from "./db/connectDB.js";

// middlewares
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// routers
import authRouter from "./routes/authRoutes.js";
import muscleRouter from "./routes/muscleRoutes.js";
import exerciseRouter from "./routes/exerciseRoutes.js";
import workoutRouter from "./routes/workoutRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/muscle", muscleRouter);
app.use("/api/v1/exercise", exerciseRouter);
app.use("/api/v1/workout", workoutRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
