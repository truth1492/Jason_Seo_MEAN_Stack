let http = require("http");
let url = require("url");
let fs = require("fs");

let indexPage = `
<html>
        <head>
        <style>
            .labelClass{
                float: left;
                width: 70px;
            }
        </style>
        </head>
        
        <body>
        <h2 style="text-align: center"><u>Task Planner</u></h2><br/>

        <p><u><b>Add Task</b></u></p><br/>
        <form action="taskPlans">
            <span class="labelClass">Emp Id: </span><input type="text" name="empid"><br/><br/>
            <span class="labelClass">Task Id: </span><input type="text" name="taskid"><br/><br/>
            <span class="labelClass">Task: </span><input type="text" name="task"><br/><br/>
            <span class="labelClass">Deadline: </span><input type="date" name="deadline"><br/><br/>
            <input type="submit" value="Add Task"/>
            <input type="reset" value="Reset"/>
        </form><br/><br/>
        
        <p><u><b>Delete Task</b></u></p><br/>
        <form action="deleteTask">
            <span class="labelClass">Task Id: </span><input type="text" name="taskid">
            <input type="submit" value="Delete Task"/>
        </form><br/>

        <p><u><b>List Task</b></u></p><br/>
        <form action="listTask">
            <input type="submit" value="List Task"/>
        </form>
        
        </body>

</html>
`

let server = http.createServer((req,res)=> {
    let urlInfo = url.parse(req.url,true);
    //console.log(urlInfo);
    if(urlInfo.path != "/favicon.ico"){
        if(urlInfo.pathname == "/taskPlans"){
            let newTask = urlInfo.query;
            let tasks = JSON.parse(fs.readFileSync("taskPlans.json").toString());
            let result = tasks.find(t=>t.tid == newTask.taskid);

            res.writeHead(200,{"content-type":"text/html"});
            if(result == undefined){
                let empid = newTask.empid;
                let taskid = newTask.taskid;
                let task = newTask.task;
                let deadline = newTask.deadline;

                let addTask = {empid, taskid, task, deadline};
                
                tasks.push(addTask);
                fs.writeFileSync("taskPlans.json", JSON.stringify(tasks,null,4));
                
            }else{
                res.write("Task id must be unique");
            }
            
        }else if(urlInfo.pathname=="/deleteTask"){
            var removeTaskId = taskid;
            var data = fs.readFileSync("taskPlans.json").toString();
            var json = JSON.parse(data);
            var taskid = json.taskid;
            json.taskid = taskid.filter((taskid) => { return taskid.taskid !== removeTaskId });
            fs.writeFileSync('results.json', JSON.stringify(json, null, 2));


        }else if(urlInfo.pathname=="/listTask"){
            let taskArray = JSON.parse(fs.readFileSync("taskPlans.json").toString());
            var tableContent = "";
            var startTable = "<table border=1 align=center><tr><th>Emp ID</th><th>Task ID</th><th>Task</th><th>Deadline</th></tr>";
            taskArray.forEach(n => {
                tableContent += "<tr><td>" + n.empid + "</td><td>" + n.taskid + "</td><td>" + n.task + "</td><td>" + n.deadline +"</td></tr>";
            })
            var endTable = "</table>"
            res.write(startTable + tableContent + endTable);
        }else{
            res.write(indexPage);
        }
    }
    res.end();
});

server.listen(9090,()=>console.log("Server is running on port number 9090"))