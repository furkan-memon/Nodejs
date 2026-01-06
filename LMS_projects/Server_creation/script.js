<<<<<<< HEAD
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    
    console.log("Request URL: ", req.url);

    let fileName = "";

    switch (req.url) {
        case '/':
            fileName = "home.html";
            break;
        case '/contact':
            fileName = "contact.html";
            break;
        case '/about':
            fileName = "about.html";
        
   
           
    }

    fs.readFile(fileName, (err, result) => {
        if (err) {
            res.end("Error loading page");
        }
        res.end(result);
    });
});

server.listen(7804, () => {
    console.log("Server started at http://localhost:7804");
=======
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    
    console.log("Request URL: ", req.url);

    let fileName = "";

    switch (req.url) {
        case '/':
            fileName = "home.html";
            break;
        case '/contact':
            fileName = "contact.html";
            break;
        case '/about':
            fileName = "about.html";
        
   
           
    }

    fs.readFile(fileName, (err, result) => {
        if (err) {
            res.end("Error loading page");
        }
        res.end(result);
    });
});

server.listen(7804, () => {
    console.log("Server started at http://localhost:7804");
>>>>>>> 67f9d5b6e2c3eb4e9f012d88ab7c988d628032d8
});