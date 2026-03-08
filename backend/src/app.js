import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import moviesRouter from "./routes/movies.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",      // dev only, not for prod
  "https://silver-track-by-balaji.vercel.app"
];

// dev only, not for prod
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/movies", moviesRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(errorMiddleware);

export default app;
