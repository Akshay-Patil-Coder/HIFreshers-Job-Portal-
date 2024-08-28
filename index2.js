const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.get("/api",(req,resp)=>{

    resp.send('welcome to api of jwt');
});
app.post('/api/login',(req,resp)=>{
    const user={
        id:1,
        USername:"akshay",
        email:"akshayp08899@gmail.com"
    }
    jwt.sign({user},'secretKey',{expiresIn:'300s'},(err,token)=>{
resp.json({token});
    });
});
app.post('/api/update',verifyToken,(req,resp)=>{
    jwt.verify(req.token,'secretKey',(err,authdata)=>{
        if(err){
            resp.send("error");
        }

        else{
            resp.json({
                message:"connected",
                authdata
            })
        }
    })
});
function verifyToken(req,resp,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        req.token= bearerToken;
        next();
    }
    else{
        resp.send('no login');
    }
}
app.listen(5300);