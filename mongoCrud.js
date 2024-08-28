const express = require('express');
const dbConnect = require('./mongodbdata');
const app = express();
app.use(express.json());

app.get('/', async (req,resp)=>{
let data = await dbConnect();
data = await data.find().toArray();
resp.send(data);
console.log(data);

});
app.post('/', async (req,resp)=>{
    let data = await dbConnect();
    let result  = await data.insertOne(req.body);
    resp.send(result);
    console.log(result);
    
    });
    app.put('/', async (req,resp)=>{
        let data = await dbConnect();
        let result  = await data.updateOne({name:req.body.name},{$set:req.body});
        resp.send(result);
        console.log(result);
        
        });
        
    app.delete('/', async (req,resp)=>{
        let data = await dbConnect();
        let result  = await data.deleteOne({name:req.body.name});
        resp.send(result);
        console.log(result);
        
        });

app.listen(5400);