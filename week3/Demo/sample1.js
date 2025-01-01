let emp = {
    empID : 101,
    empName : "Sreeja"
}
console.log(emp)
console.log(emp.empName)
var http = require('http')
http.createServer(function(req,res){
    res.end("My First App`")
}).listen(8080)