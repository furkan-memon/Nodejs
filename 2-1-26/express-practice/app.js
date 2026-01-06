const express = require("express")
const app = express()

const logger = require("./middleware/logger");
app.use(logger);

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

app.get("/",(req,res)=>{
     res.send("Express Home Page");
})
app.listen(7804,()=>{
     console.log("Server running at http://localhost:7804");
})