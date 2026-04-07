import express from "express";
import dotenv from "dotenv";
import router from "./router.js";
dotenv.config();
const app = express();


console.log(process.env.PORT);
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});



app.use("/api", router);

app.get("/hello",(req,res)=>{
    res.send("Hello World");
})
app.get("/error", async (req, res) => {
  try {
    throw new Error("Something went wrong");
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})