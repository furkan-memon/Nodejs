const { Router } = require("express");
const {
    home, register, task, login, taskForm, signup,
    login_Post, signout, taskForm_post, mytask, taskGet,
    adminDelete, allTask, editTask, updateTask, deleteTask, taskItem
} = require("../controller/usercontroler");
const { verify, adminVerify } = require("../middleware/verify");

const opp = Router();

// Public routes
opp.get("/", home);
opp.get("/register", register);
opp.get("/login", login);
opp.get("/task", task);

// Auth routes
opp.post("/register", signup);
opp.post("/login", login_Post);
opp.get("/signout", signout);

// Protected user routes
opp.get("/taskList", verify, taskGet);
opp.get("/taskForm", verify, taskForm);
opp.post("/taskForm", verify, taskForm_post);
opp.get("/mytask", verify, mytask);
opp.get("/taskItem", verify, taskItem);

// Protected task CRUD routes
opp.delete("/delete/:id", verify, deleteTask);
opp.get("/edit/:id", verify, editTask);
opp.patch("/edit/:id", verify, updateTask);

// Admin only routes
opp.get("/allTask", adminVerify, allTask);
opp.delete("/admin/delete/:id", adminVerify, adminDelete);

module.exports = opp;
