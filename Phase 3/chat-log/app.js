// load the express module
let express = require("express");

// create the reference of express module
let app = express();

// load the http module and connect to express module with Server property
let http = require("http").Server(app);

// load the socket.io module and connect to http module
let io = require('socket.io')(http);

// Load all modules
const { req, res} = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
let chatlogModel = require("./model/chatlog.model");

// Add Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// url database
let url = "mongodb://localhost:27017/test"

app.get("/index",(req,res)=> {
    res.sendFile(__dirname+"\\index.html");
})
io.on("connection",(socket)=> {
    socket.emit("chatlog", "{" + "\"user\"" + ":" + "\"" + 
    document.getElementById("user").value + "\"" + " , " + "\"msg\"" +":" + "\"" + 
    document.getElementById("msg").value + "\"" + "}");
})

let num = 0;
app.post('/chatlog',(req,res)=> {
    let chatlog = req.body;
    let c = new chatlogModel({_id:num,name:chatlog.user,message:chatlog.msg});
    chatlogModel.insertMany(c,(err,result)=> {
        if(!err){
            res.send("Successfully Added!");
            num++;
        }else{
            console.log(err);
        }
    })
    return num;
})

// Connect the database
mongoose.connect(url).
then(res=>console.log("Connected")).
catch(error=>console.log(error));

app.listen(9090,()=>console.log("Server running on port number 9090"));