import express from "express";
import cors from "cors";
import dotenv from "dotenv"
const app = express();

app.use(cors({
  origin: "http://localhost:4200"
}))

//parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//clear cache
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next()
});

dotenv.config({ path: ".env" });

import connectDB from "./dbConnection";

connectDB();

const PORT = process.env.PORT;


import userRouter from "./routes/userRouter"
import adminRouter from "./routes/adminRouter"


app.use( "/user", userRouter )
app.use( "/admin", adminRouter );

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) })