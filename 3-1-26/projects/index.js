const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  fs.readdir('files', (err, files) => {
    res.render('index', {
        files:files
    })
})})
app.post('/creat', (req, res) => {
  fs.writeFile(`./files/${req.body.name.split(' ').join('') }.txt`, req.body.detils, (err) => {

    // if (err) {
    //   return res.send('Error creating file')
    // }
    res.redirect('/')
  
})})
app.get('/files/:filename', (req, res) => {
fs.readFile(`./files/${req.params.filename}`,"utf8",(err,filedata)=>{
res.render('show',{filesname : req.params.filename ,filedata:filedata})
})
 })
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
