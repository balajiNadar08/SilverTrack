import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.NEXT_PUBLIC_PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});