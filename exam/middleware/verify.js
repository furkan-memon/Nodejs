const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
    let token = req.cookies.token;

    if (!token) return res.redirect("/login");

    try {
        let data = jwt.verify(token, "secret");
        req.user = data;
        next();
    } catch {
        res.redirect("/login");
    }
};

const adminVerify = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.send("Access denied");
    }
    next();
};

module.exports = { verify, adminVerify };