import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import queryRoute from "./routes/query.js";
import statsRoute from "./routes/stats.js";
import searchRoute from "./routes/search.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Routes
app.use("/api", queryRoute);
app.use("/api", statsRoute);
app.use("/api", searchRoute);



app.get("/",(req, res)=>{
    res.json({ status: "QueryCart server is running 🚀" });
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});