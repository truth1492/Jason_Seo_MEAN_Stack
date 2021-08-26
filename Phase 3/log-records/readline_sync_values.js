let fs = require("fs");

var employee = {};
employee.table = [];

let readline = require("readline-sync");

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();

let currentDate = (month + "-" + date + " " + hours + ":" + minutes);

for (i=0; i<2; i++){
    let firstname = readline.question("Enter your first name: ");
    let lastname = readline.question("Enter your last name: ");
    let gender = readline.question("Enter your gender: ");
    let emailId = readline.questionEMail("Enter your email id: ");
    
    employee.table.push({firstname,lastname,gender,emailId,currentDate});     
 }

 fs.writeFile ("employee.json", JSON.stringify(employee,null,4), function(err) {
     if (err) throw err;
     console.log('complete');
     }
 );

 
