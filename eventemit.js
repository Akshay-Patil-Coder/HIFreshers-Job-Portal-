const EventEmitter = require('events');
const express = require('express');
const event = new EventEmitter();
const app = express();
let count = 0;
event.on("hello",()=>{
count++;
console.log("this is counting"+count);
});
app.get('/',(req,resp)=>{
    resp.send("api is called");
   event.emit("hello"); 

});
app.get('/update',(req,resp)=>{
    resp.send("api is called");
   event.emit("hello"); 

});
app.get('/search',(req,resp)=>{
    resp.send("api is called");
   event.emit("hello"); 

});
app.listen(2000);