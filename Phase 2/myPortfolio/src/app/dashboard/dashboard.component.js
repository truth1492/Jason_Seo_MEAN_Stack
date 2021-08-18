function storeData(){

    var client = document.getElementById("clientName").value;
    var project = document.getElementById("projectName").value;

    var emp = [ client, project, budget ];
    localStorage.setItem("empObj",JSON.stringify(emp));
    console.log("Data stored in local")
}

function getData(){

    let empObj = localStorage.getItem("empObj");
    let empJson = JSON.parse(empObj)|| []
    console.log("emp obj " + empJson);
}

function removeData(){

    /*<script>
    window.onload = function() {
        startcountdown();
    }   
    </script> */
}

function displayData(){

    let empObj = localStorage.getItem("empObj");
    let empJson = JSON.parse(empObj)
    var tableContent =""
    var startTable = "<table border=1 width=200 align=center><tr><th>Id</th><th>Name</th></tr>"
    tableContent = "<tr><td>"+empJson[0]+"</td><td>"+empJson[1]+"</td></tr>"
    var endTable = "</table>"
    tableContent = startTable+tableContent+endTable
    document.getElementById("main").innerHTML=tableContent;    

}