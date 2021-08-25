let fs = require("fs");

var employee = {};
employee.table = [];

let readline = require("readline-sync");

for (i=0; i<2; i++){
    let firstname = readline.question("Enter your first name: ");
    let lastname = readline.question("Enter your last name: ");
    let gender = readline.question("Enter your gender: ");
    let emailId = readline.questionEMail("Enter your email id: ");
    
    employee.table.push({firstname,lastname,gender,emailId});     
 }

 fs.writeFile ("employee.json", JSON.stringify(employee,null,4), function(err) {
     if (err) throw err;
     console.log('complete');
     }
 );