import express from "express";
import { PORT } from "./config";
import connectDB from "./db/db";
import AuthRoute from "./routes/AuthRoute";
import cors from 'cors'
import ProductRoute from "./routes/ProductRoute";
import path from 'path'

connectDB();

const app = express();
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

app.use("/api/products", ProductRoute);
app.use("/api/auth", AuthRoute);

app.listen(PORT, () => {
console.log(`server is running ${PORT}`);
});
