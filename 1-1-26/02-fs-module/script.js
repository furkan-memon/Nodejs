const fs = require('fs')
// Used to create or overwrite a file.
// fs.writeFile('hey.txt','hey hello kaiso ho ',function(err){
//   if(err){
//     console.log(err)
//   }
//   else{console.log("Done");
//   }
// })
// data.txt → file name
// "utf8" → converts buffer to readable text
// const data = fs.readFile('hey.txt',"utf8",function(err,data){
//   if(err){
//     console.log(err)
//   }
//   else{console.log("Done");
//     console.log(data);
//   }
// })
// Used to add content without deleting old data.
// fs.appendFile('hey.txt',',ghar me sab kaise  hai ',function(err){
//   if(err){
//     console.log(err)
//   }
//   else{console.log("Done");
//   }
// })
// Renaming files or folders
// fs.rename('hey.txt','bro.txt',function(err){
//   if(err){
//     console.log(err)
//   }
//   else{console.log("Done");
//   }
// })
// fs.copyFile('bro.txt','./copy/copy.txt',function(err){
//   if(err){
//     console.log(err)
//   }
//   else{console.log("Done");
//   }
// })
// Used to remove a file permanently.
// fs.unlink('bro.txt',function(err){
//   if(err){
//     console.log(err)
//   }
//   else{console.log("Done");
//   }
// })
// Used to create directories.
// fs.mkdir("myFolder", (err) => {
//   if (err) throw err;
// });
// Used to delete Folder
// fs.rmdir('./copy',{recursive:true},function(err){
//   if(err){
//     console.log(err)
//   }
//   else{console.log("Done");
//   }
// })
const result = fs.existsSync("hey.txt");
console.log(result);
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