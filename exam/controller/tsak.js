const Task = require("../model/task");

const createTask = async (req, res) => {
    let { title, category } = req.body;

    await Task.create({
        title,
        category,
        createdby: req.user.id
    });

    res.redirect("/taskList");
};

const myTask = async (req, res) => {
    let data = await Task.find({ createdby: req.user.id });
    res.render("taskList", { data, user: req.user });
};

const allTask = async (req, res) => {
    let data = await Task.find().populate("createdby");
    res.render("taskList", { data, user: req.user });
};
const deleteTask = async (req, res) => {
    let task = await Task.findById(req.params.id);

    if (req.user.role !== "admin" && task.createdby.toString() !== req.user.id) {
        return res.send("Access denied");
    }

    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/taskList");
};

const editTask = async (req, res) => {
    let task = await Task.findById(req.params.id);

    if (req.user.role !== "admin" && task.createdby.toString() !== req.user.id) {
        return res.send("Access denied");
    }

    res.render("edittask", { task, edit: true, user: req.user });
};

const updateTask = async (req, res) => {
    let task = await Task.findById(req.params.id);

    if (req.user.role !== "admin" && task.createdby.toString() !== req.user.id) {
        return res.send("Access denied");
    }

    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/taskList");
};

module.exports = {
    createTask,
    myTask,
    allTask,
    deleteTask,
    editTask,
    updateTask
};