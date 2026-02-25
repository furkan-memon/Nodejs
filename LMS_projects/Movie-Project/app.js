require('dotenv').config();
const express = require('express');
const connectDB = require("./config/mongoose-connection");
const routes = require('./routes/index');
const cookieParser = require('cookie-parser');

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", routes);


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed:", error.message);
  }
};

startServer();
