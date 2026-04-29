const User = require("../model/userscema");
const Task = require("../model/taskscema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../middleware/verify");

const home = (req, res) => {
    res.render("task");
}

const register = (req, res) => {
    res.render("register");
}

const task = (req, res) => {
    res.render("task");
}

const login = (req, res) => {
    res.render("login");
}

const taskForm = (req, res) => {
    res.render("taskForm", { edit: false, data: null });
}

const taskItem = (req, res) => {
    res.render("taskItem");
}

const signup = async (req, res) => {
    try {
        const { email, password, username, role } = req.body;
        let data = await User.findOne({ email: email });
        if (data) {
            return res.send({ message: 'User already exists' });
        } else {
            const hash = await bcrypt.hash(password, 5);
            let obj = { email, password: hash, username, role };
            let newUser = await User.create(obj);
            let token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET);
            return res.cookie("token", token, { httpOnly: true })
                .cookie("id", newUser._id, { httpOnly: true })
                .cookie("role", newUser.role, { httpOnly: true })
                .redirect("/taskList");
        }
    } catch (error) {
        return res.send({ Error: error.message });
    }
}

const login_Post = async (req, res) => {
    let { password, email } = req.body;

    let data = await User.findOne({ email: email });
    if (data) {
        let done = await bcrypt.compare(password, data.password);
        if (done) {
            let token = jwt.sign({ id: data._id, role: data.role }, JWT_SECRET);
            return res.cookie("token", token, { httpOnly: true })
                .cookie("id", data._id, { httpOnly: true })
                .cookie("role", data.role, { httpOnly: true })
                .redirect("/taskList");
        } else {
            return res.send("Password wrong!");
        }
    } else {
        return res.send("User not found!");
    }
}

const signout = (req, res) => {
    res.clearCookie("token").clearCookie("id").clearCookie("role").redirect("/login");
}

const taskForm_post = async (req, res) => {
    let { title, category } = req.body;
    req.body.createdby = req.user.id;

    let data = await Task.create(req.body);
    return res.redirect("/taskList");
}

const taskGet = async (req, res) => {
    let { id } = req.cookies;
    let tasks = await Task.find({ createdby: id }).lean();
    res.render("task", { tasks: tasks, userRole: req.user.role });
}

const mytask = async (req, res) => {
    let { id } = req.cookies;
    let data = await Task.find({ createdby: id });
    res.json(data);
}

const adminDelete = async (req, res) => {
    let { id } = req.params;
    let data = await Task.findByIdAndDelete(id);
    res.json({ message: 'deleted', data });
}

const allTask = async (req, res) => {
    let data = await Task.find().populate("createdby", "username email");
    res.json(data);
}

const editTask = async (req, res) => {
    let { id } = req.params;
    let data = await Task.findById(id);
    res.render("taskForm", { data: data, edit: true });
}

const updateTask = async (req, res) => {
    let { id } = req.params;
    let data = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(data);
}

const deleteTask = async (req, res) => {
    let { id } = req.params;
    let task = await Task.findById(id);
    
    if (req.user.role === "admin" || task.createdby.toString() === req.user.id) {
        await Task.findByIdAndDelete(id);
        res.json({ message: 'deleted' });
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
}

module.exports = {
    home, register, task, login, taskItem, taskForm,
    signup, login_Post, signout, taskForm_post, mytask,
    taskGet, adminDelete, allTask, editTask, updateTask, deleteTask
}
