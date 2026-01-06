const fs =  require("fs");
fs.writeFile( "02-fs-module/data.txt", "Hello from File System module",function(err){
  if(err){
    console.log(err)
  }
  else{console.log("Done");
  }
});

console.log("File created");
// node 02-fs-module/writeFile.js