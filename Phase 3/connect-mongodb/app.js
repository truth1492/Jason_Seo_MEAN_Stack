// Load all modules
const { req, res} = require("express");
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
let courseModel = require("./model/course.model");

// Create the reference of express
let app = express();

// Add Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// url database
let url = "mongodb://localhost:27017/test"

app.get('/index',(req,res)=> {
    res.sendFile(__dirname+"\\index.html");
})
app.get('/add',(req,res)=>{
    res.sendFile(__dirname+"\\add_course.html");
})
app.get('/update',(req,res)=>{
    res.sendFile(__dirname+"\\update_course.html");
})
app.get('/delete',(req,res)=>{
    res.sendFile(__dirname+"\\delete_course.html");
})
app.get('/fetch',(req,res)=>{
    res.sendFile(__dirname+"\\fetch_course.html");
})
app.post('/addCourse',(req,res)=> {
    let course = req.body;
    let c = new courseModel({_id:course.id,cname:course.cname,desc:course.desc,amount:course.amount});
    courseModel.insertMany(c,(err,result)=> {
        if(!err){
            res.send("Successfully Added!");
        }else{
            console.log(err);
        }
    })
})
app.get('/updateCourse',(req,res)=> {
    let updateId = req.query['id'];
    let updateAmount = req.query['amount'];
    courseModel.updateOne({_id:updateId},{$set:{amount: updateAmount}}, (err, result)=>{
        if(!err){
            res.send("Successfully Updated!");
        }else{
            res.send(err);
        }
    })
})
app.get('/deleteCourse',(req,res)=> {
    let deleteId = req.query['id'];
    courseModel.deleteOne({_id:deleteId},(err, result)=>{
        if(!err){
            res.send("Successfully Deleted!");
        }else{
            res.send(err);
        }
    })
})
app.get("/fetchcourse",(req, res)=>{
    courseModel.find({},(err,data)=> {
        if(!err){
            res.json(data);
        }else {
             res.json(err);   
        }
    })
})



// Connect the database
mongoose.connect(url).
then(res=>console.log("Connected")).
catch(error=>console.log(error));

app.listen(9090,()=>console.log("Server running on port number 9090"));