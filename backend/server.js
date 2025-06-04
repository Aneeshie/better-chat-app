import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import conn from "./db/db.js"
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/",(req,res) => {
  res.send("this is the root route");
});

app.use("/api/auth",authRoutes);


app.listen(PORT,() => {
  conn();
  console.log(`The server is running on PORT ${PORT}`)
})
