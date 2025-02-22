import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js"
import cors from "cors"

dotenv.config()
const app = express();

const PORT = process.env.PORT;
app.use(cookieParser());
app.use(cors({
    origin : "https://refactored-space-funicular-xjr6j99x7vg2697g-5173.app.github.dev/",
    credentials : true,
}))
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT );
    connectDB();
});