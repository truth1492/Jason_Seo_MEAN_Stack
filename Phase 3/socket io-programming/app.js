// load the express module
let express = require("express");

// create the reference of express module
let app = express();

// load the http module and connect to express module with Server property
let http = require("http").Server(app);

// load the socket.io module and connect to http module
let io = require('socket.io')(http);

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"\\index.html");
})

io.on("connection",(socket)=> {
    console.log("Client Connected");
    //receive the message from client application
    socket.on("obj",(msg)=> {
        io.socket.emit("obj","hello")
    })
    // sending data to client
    socket.emit("obj","Hello Client connected server...");

    //document.getElementById("messages").innerHTML += "Server: Welcome!" + "\n";
})


// please run the server using http module not express module
http.listen(9090,()=>console.log("Server running on port number 9090"));