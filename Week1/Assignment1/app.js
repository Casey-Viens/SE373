// http://localhost:3000/todo
// display todo.json


// http://localhost:3000/index
// display html page


// http://localhost:3000/read-todo 
// display html page that makes ajax call to http://localhost:3000/todo


// http://localhost:3000/fake-page
// redirect to index



var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (request, response) {
    var pathName = request.url
    var todoFileName = "todo.json"
    var indexFileName = "index.html"
    var readTodoFileName = "readTodo.html"

    if (pathName == "/todo") {
        fs.readFile(todoFileName, todoCallback)
    } else if (pathName == "/read-todo") {
        fs.readFile(readTodoFileName, callback)
    } else if (pathName == "/fake-page") {
        response.writeHead(301, { 'Location': "http://" + request.headers['host'] + '/index.html' });
        response.end();
    } else {
        fs.readFile(indexFileName, callback)
    }

    function todoCallback(err, data) {
        if (err) {
            console.log(err)
            response.writeHead(400, ({ 'Content-type': 'text/html' }))
            response.write("<!DOCTYPE html><html><body><div>Page not found</div></body></html>")
        }
        else {
            response.writeHead(200, ({ 'Content-type': 'application/json' }));
            response.write(data.toString())
        }
        response.end();
    }

    function callback(err, data) {
        if (err) {
            console.log(err)
            response.writeHead(400, ({ 'Content-type': 'text/html' }))
            response.write("<!DOCTYPE html><html><body><div>Page not found</div></body></html>")
        }
        else {
            response.writeHead(200, ({ 'Content-type': 'text/html' }));
            response.write(data.toString())
        }
        response.end();
    }


}).listen(3000)

console.log("Running on port 3000");