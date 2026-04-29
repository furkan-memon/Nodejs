const express = require("express");
const router = express.Router();

const { signup, login, logout } = require("../controller/auth");
const { createTask, myTask, allTask, deleteTask } = require("../controller/tsak");
const { verify, adminVerify } = require("../middleware/verify");
const { editTask, updateTask } = require("../controller/tsak");
router.get("/", (req, res) => res.redirect("/login"));

router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));

router.post("/login", login);
router.post("/register", signup);
router.get("/logout", logout);
router.get("/edit/:id", verify, editTask);
router.post("/edit/:id", verify, updateTask);
router.get("/taskList", verify, myTask);
router.get("/allTask", verify, adminVerify, allTask);

router.get("/taskForm", verify, (req, res) => {
    res.render("taskForm", { user: req.user });
});
router.post("/taskForm", verify, createTask);

router.get("/delete/:id", verify, deleteTask);

module.exports = router;