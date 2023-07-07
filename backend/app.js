// deps
import express, { json } from "express";
import morgan from "morgan";
import { createWriteStream } from "fs";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authenticationRouter from "./routes/auth.js";
import cityRouter from "./routes/city.js";
import activityRouter from "./routes/activity.js";
import userRouter from "./routes/user.js";
import ratingRouter from "./routes/rating.js";
import checkToken from './middlewares/checkToken.js';
// init
dotenv.config();
const app = express();

//config
mongoose.set('strictQuery', false);
const mongoDB = process.env.DB_CONNECTION;
// Wait for database to connect, logging an error if there is a problem 
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/traveltips');
}

app.use(json());
app.use(cors());
app.use(
  morgan("common", {
    stream: createWriteStream("./access.log", { flags: "a" }),
  })
);

// middlewares

//routes
app.use('/api', authenticationRouter);
app.use('/api/cities', checkToken, cityRouter);
app.use('/api/activities', checkToken, activityRouter);
app.use('/api/users', checkToken, userRouter);
app.use('/api/ratings', checkToken, ratingRouter);

// error handlers
app.use((error, req, res, next) => {
  res.status(404).json({ success: false, error: error.message });
});

// bootstrap
app.listen(process.env.PORT, () => console.log('listening on 3000'));
