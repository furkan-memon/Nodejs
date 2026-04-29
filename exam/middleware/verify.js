const jwt = require('jsonwebtoken');

const JWT_SECRET = "jeel_secret_key";

const verify = (req, res, next) => {
    let { token } = req.cookies;

    if (token) {
        try {
            let decode = jwt.verify(token, JWT_SECRET);
            req.user = decode;
            next();
        } catch (err) {
            return res.redirect("/login");
        }
    } else {
        return res.redirect("/login");
    }
}

const adminVerify = (req, res, next) => {
    let { token } = req.cookies;

    if (token) {
        try {
            let decode = jwt.verify(token, JWT_SECRET);
            if (decode.role === "admin") {
                req.user = decode;
                next();
            } else {
                return res.status(403).send("Access denied. Admin only.");
            }
        } catch (err) {
            return res.redirect("/login");
        }
    } else {
        return res.redirect("/login");
    }
}

module.exports = { verify, adminVerify, JWT_SECRET };
