const http = require('http')
const server = http.createServer((req, res) => {
    if (req.url == '/') {

        res.write("Home Page");
    }
    else if (req.url === "/about") {
        res.write("About Page");
    }
    else {
        res.write("404 Not Found");
    }
     res.end();
})
server.listen((7804),()=>{
    console.log("Server running at http://localhost:7804");
})
// const fs = require('fs')
// const http = require('http')

// const port = 5020;

// const request = (req , res) => {
//   let fileName = "";
//   switch(req.url){
//     case '/' : fileName = '/index.html'
//     break
//     case '/home':fileName = '/home.html'
//     break
//     case '/about':fileName = '/about.html'
//     break
//      case '/contact':fileName = '/contact.html'
//     break
//   }

//   fs.readFile(fileName , (err , data) => {
//     if(!err){
//       res.end(data)
//     }
//   })
// }


// const server = http.createServer(request)

// server.listen(port , (err) => {
//   if(!err){
//     console.log('Nodejs Server Start on port 5020');
//   }else{
//     console.log("Nodejs server not running");
//   }
// })