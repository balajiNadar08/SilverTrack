import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import moviesRouter from "./routes/movies.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
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
