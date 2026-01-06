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
  fs.writeFile(`./files/${req.body.Title.split(' ').join('') }.txt`, req.body.detils, (err) => {
   res.redirect('/')
  
})})
app.post('/edit', (req, res) => {
  const oldName = req.body.Prev
  const newName = req.body.Newname

  if (!oldName || !newName) {
    return res.status(400).send('Invalid data')
  }

  fs.rename(`./files/${oldName}`,`./files/${newName}.txt`, (err) => {
    err => {
      if (err) console.error(err)
      }
      res.redirect('/')

}
)})
app.get('/files/:filename', (req, res) => {
  
fs.readFile(`./files/${req.params.filename}`,"utf8",(err,filedata)=>{
res.render('show',{filesname : req.params.filename ,filedata:filedata})
})
 })
 app.get('/edit/:filename', (req, res) => {
  res.render('edit', {filename : req.params.filename })
})
 
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
