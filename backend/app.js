import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import notesRouter from "./routes/notesRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://voicenote-alpha.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
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

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

export default app;
