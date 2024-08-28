const http = require('http');
http.createServer((req,resp)=>{
    resp.write("<h1>hello my name is  hello akshay</h1>");
    resp.end();
}).listen(4200);