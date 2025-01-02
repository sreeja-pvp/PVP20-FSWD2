var express = require('express');

// create Server
http.createServer(function (req,res){   
    res.writeHead(200,{'content-type':'text/html'});
   
    // Send the response body
    res.end("<h2>My First App</h2>")
}).listen(8080)


