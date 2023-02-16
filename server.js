require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// others packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bp = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const connectDB = require("./db/connectDB");

// middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// routers
const authRouter = require("./routes/authRoutes");
const muscleRouter = require("./routes/muscleRoutes");
const exerciseRouter = require("./routes/exerciseRoutes");
const workoutRouter = require("./routes/workoutRoutes");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(cors());
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/muscle", muscleRouter);
app.use("/api/v1/exercise", exerciseRouter);
app.use("/api/v1/workout", workoutRouter);

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
