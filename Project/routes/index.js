const express = require("express");
const router = express.Router();
const isloggedin = require("../middleware/islogdin");
const productModel = require('../model/Product')
router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error });
});
router.get("/login", function (req, res) {
    let error = req.flash("error");
    res.render("login", { error });
});
router.get("/shop", isloggedin, async (req, res) =>{
    let products = await productModel.find()
    
    res.render("shop", {products});
}); 

module.exports = router;