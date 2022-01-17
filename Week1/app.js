var http = require('http');
var url= require('url')

http.createServer(function(request, response){
    var pathName= request.url
    response.writeHead(200, ({'Content-type':'text/html'}));
    response.write('<!DOCTYPE html><html><body><div>Request for' + pathName + " received </div></body></html>")
    response.end();
}).listen(3000)

console.log("Running on port 3000");