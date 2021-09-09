// Load the module
let mongoose = require("mongoose");

mongoose.pluralize(null);   // To avoid creating in lower case with s postfix
// Create the Schema
let chatlogSchema = mongoose.Schema({
    _id : Number,
    name : String,
    message : String
    
});


// Using schema creating model
// 1st parameter collection name
// 2nd parameter schema reference
let chatlogModel = mongoose.model("Chatlog",chatlogSchema);

module.exports = chatlogModel;  // We can import using require in another file