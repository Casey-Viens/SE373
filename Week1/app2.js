var http = require('http');
var url= require('url')
var fs= require('fs')

http.createServer(function(request, response){
    var pathName= request.url
    var fileName = "index.html"
    fs.readFile(fileName, callback)

    function callback(err, data){
        if(err){
            console.log(err)
            response.writeHead(400, ({'Content-type':'text/html'}))
            response.write("<!DOCTYPE html><html><body><div>Page not found</div></body></html>")
        }
        else{
            response.writeHead(200, ({'Content-type':'text/html'}));
            response.write(data.toString())
        }
        response.end();
    }
}).listen(3000)

console.log("Running on port 3000");