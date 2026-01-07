import express from "express";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import moviesRouter from "./routes/movies.route";

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/movies", moviesRouter)

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;