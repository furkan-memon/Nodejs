const fs = require("fs");
const content = "\nThis line is appended"
fs.appendFile(
    "02-fs-module/data.txt",
    content,'utf8', (err)=>{
        if (err) {
    console.error(err);
    return;
  }
  console.log("Data is appended to file successfully!")
    }
);

console.log("Text appended");