const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const todoRoutes = require("./Routes/TodoRoute.js");
const app = express();

const port = process.env.PORT || 4000;
const dbUrl = process.env.ATLASDB_URL;


app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use(
    cors({
        origin: 'https://to-do-app-1-raf1.onrender.com',
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());

app.use(express.json());


main().then(() => {
    console.log("connected to DB");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}




app.use("/", authRoute);
app.use("/api/todos", todoRoutes);

app.listen(port, async () => {
    console.log(`server is listening on port ${port}`);

});





