const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    let { username, email, password, role } = req.body;

    let hash = await bcrypt.hash(password, 5);
    await User.create({ username, email, password: hash, role });

    res.redirect("/login");
};

const login = async (req, res) => {
    let { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) return res.send("User not found");

    let match = await bcrypt.compare(password, user.password);

    if (!match) return res.send("Wrong password");

    let token = jwt.sign({ id: user._id, role: user.role }, "secret");
    res.cookie("token", token);

    res.redirect("/taskList");
};

const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
};

module.exports = { signup, login, logout };