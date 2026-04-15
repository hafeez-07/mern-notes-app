import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import notesRouter from "./routes/notesRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(
  cors({
    origin: "https://voicenote-alpha.vercel.app",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb();
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", notesRouter);
app.use("/", userRouter);

export default app;
