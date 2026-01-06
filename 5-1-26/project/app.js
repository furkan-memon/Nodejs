const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./model/user')


app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.get('/', (req, res) => {
    res.render("index")
})  
app.get('/', (req, res) => {
    res.render("index")
})
app.post('/create', async (req, res) => {
    const { name, email, imgurl } = req.body;
    let createUser = await userModel.create({ name, email, imgurl });
       res.redirect('/read');

})
app.get('/read', async (req, res) => {
    let users =  await userModel.find({});
    res.render("read", { users })
})
app.get('/edit/:id', async (req, res) => {
    let user =  await userModel.findOne({_id:req.params.id});
    res.render("edit", { user })
})
app.post('/update/:id', async (req, res) => {
    let user =  await userModel.findOneAndUpdate({_id:req.params.id}, req.body,{ new: true });
    res.redirect('/');
})
app.get('/delete/:id', async (req, res) => {
    let users =  await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect('/read');
})
app.listen(7804)