const express=require("express");
const connect = require("./config/db");
const ejs=require("ejs")
const opt=require("./Routes/route")
const cookie = require("cookie-parser");
const opp = require("./Routes/route");

const app=express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.set("views",__dirname+"/Views")
app.use(express.static(__dirname+"/public"))
app.use(cookie())
app.use(opp)

app.listen(7070,()=>{
    console.log("Server is running on port 7070");
    connect()
})