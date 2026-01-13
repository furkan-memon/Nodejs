
const jwt = require("jsonwebtoken");

const userModel = require("../model/user");

module.exports = async function (req, res, next) {
    
    
    if (!req.cookies?.token) {
        req.flash("error", "you need to login first");
        return res.redirect("/");
    }else{

        try {
            let decoded = jwt.verify(req.cookies.token, process.env.JWT_KAY);
            let user = await userModel
                .findOne({ email: decoded.email })
                .select("-password");
                 if (!user) {
          req.flash("error", "User not found");
          return res.redirect("/");
        }
            req.user=user;
            next();
        } catch (err) {
            req.flash("error", "something went wrong.");
            res.redirect("/");
        }
    }
};
// const jwt = require("jsonwebtoken");
// const userModel = require("../model/user");

// module.exports = async function (req, res, next) {
//   if (!req.cookies?.token) {
//     req.flash("error", "You need to login first");
//     return res.redirect("/");
//   }

//   try {
//     const decoded = jwt.verify(req.cookies.token, process.env.JWT_KAY);

//     const user = await userModel
//       .findById(decoded.id)
//       .select("-password");

//     if (!user) {
//       req.flash("error", "User not found");
//       return res.redirect("/");
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error(err);
//     req.flash("error", "Session expired. Please login again.");
//     res.redirect("/");
//   }
// };
