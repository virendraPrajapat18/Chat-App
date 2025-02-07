import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app ,server } from "./socketIO/server.js";
import path from "path";


dotenv.config();

// const app = express();

app.use(
  cors()
); //Enable cors for all requests

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;


mongoose.connect(URI)
        .then((e) => console.log("MongoDB Connected"));


app.use("/api/user",userRoute);
app.use("/api/message", messageRoute);




//deploy

if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();
  app.use(express.static("./Frontend/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirPath, "./Frontend/dist", "index.html"));
  });
}



server.listen(PORT,()=> console.log(`Server started at PORT:${PORT}`));