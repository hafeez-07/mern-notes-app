import router from "./routes/notesRouter.js";
import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb();

app.use("/", router);

export default app;
