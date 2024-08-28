const express = require('express');
const app = express();
 app.get('',(req,resp)=>{
    console.log(req.query.name);
    resp.send('<h1>welcome </h1><a href="/about">go to about page</a>');
 });
 app.get('/about',(req,resp)=>{
    resp.send('<a href="/">go to home page</a>');
 });
 app.get('/contact',(req,resp)=>{
    resp.send('this is contact page');
 });
 app.listen(6200);