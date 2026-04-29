const { Router } = require("express");
const { home, register, taskList, login, taskForm, signup, login_Post, signout, taskForm_post, mytask, taskListGet, admindelet, allTask, taskItem } = require("../controller/usercontroler");
const verify=require("../middleware/verify")
const user=require("../model/userschema")

const opp=Router()

opp.get("/",home)
opp.get("/register",register)
opp.get("/login",login)
opp.get("/taskList",taskList)
opp.get("/taskForm",verify,taskForm)
opp.get("/taskList",taskListGet)
opp.post("/register",signup)
opp.post("/login",login_Post)
opp.get("/signout",signout)
opp.post("/taskForm",verify,taskForm_post)

opp.get("/mytask",verify,mytask)

opp.delete("/delete/:id",admindelet)


opp.get("/edit/:id",async(req,res)=>{
    let {id}=req.params
    let data=await task.findById(id)
    console.log(data);
    res.render("taskForm",{data,edit:true})
})

opp.patch("/edit/:id",async(req,res)=>{

    let {id}=req.params
    let data=await task.findByIdAndUpdate(id,req.body)
    res.send(data)

})

opp.get("/allTask",allTask)



module.exports=opp