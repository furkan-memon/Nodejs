const fs = require("fs");

const data = fs.readFile("02-fs-module/data.txt", 'utf8' ,(err,data)=>{

      if(err){
        console.log(err)
      }
      else{console.log(data);
      }
}
    // ,function(err){
);

// console.log(data);
