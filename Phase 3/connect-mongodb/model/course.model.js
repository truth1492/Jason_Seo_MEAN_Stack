// Load the module
let mongoose = require("mongoose");

mongoose.pluralize(null);   // To avoid creating in lower case with s postfix
// Create the Schema
let courseSchema = mongoose.Schema({
    _id : String,
    cname : String,
    desc : String,
    amount : String
});

// Using schema creating model
// 1st parameter collection name
// 2nd parameter schema reference
let courseModel = mongoose.model("Course",courseSchema);

module.exports = courseModel;  // We can import using require in another file