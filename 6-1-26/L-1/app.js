const express = require('express');
const app = express();
const jwt =  require('jsonwebtoken');
const cookieParser = require('cookie-parser');
 app.use(cookieParser());

    app.get('/', (req, res) => {
   const token = jwt.sign({email:'furkanmemon860Agmail.com'}, 'secretkey');
        res.cookie('token', token);
       
    })
    app.get('/', (req, res) => {

    let data = jwt.verify(req.cookies.token, 'secretkey')

    console.log(data);

}
)
app.listen(7804);