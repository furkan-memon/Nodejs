const express = require("express");
const path = require("path");
const todolistRoutes = require("./routes/todolist");

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/", todolistRoutes);


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
