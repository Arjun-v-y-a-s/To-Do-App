const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const todoRoutes = require("./Routes/TodoRoute.js");
const app = express();

const port = process.env.PORT || 4000;
const dbUrl = process.env.ATLASDB_URL;


app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use(cookieParser());


app.use(
  cors({
    origin: "https://to-do-app-1-raf1.onrender.com", 
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);


async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connected to DB");
}
main().catch((err) => console.log(err));


app.use("/", authRoute);
app.use("/api/todos", todoRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
