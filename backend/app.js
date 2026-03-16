import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import notesRouter from "./routes/notesRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb();
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", notesRouter);

export default app;
