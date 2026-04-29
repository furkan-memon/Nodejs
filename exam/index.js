const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connect = require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", require("./Routes/route"));

app.listen(3000, () => {
    console.log("Server running on port 3000");
    connect();
});