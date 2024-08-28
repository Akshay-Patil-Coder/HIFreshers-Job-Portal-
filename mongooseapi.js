const express = require('express');
//const product = require('./config');

const mongoose = require('mongoose');

const app = express();
app.use(express.json);

mongoose.connect("mongodb://localhost:27017/akshay");
const productSchema = new mongoose.Schema({

    name:String,
    price:Number,
    brand:String
});

const product = mongoose.model('Product',productSchema);

app.post("/about", async (req,resp)=>{
let data = new product(req.body);
let result = await data.save();
resp.send(result);
});
app.get("/seen", async (req,resp)=>{
    let data = await product.find();
    resp.send(data);
})
app.delete("/reject", async (req,resp)=>{
    let data = await product.deleteOne({name:req.body.name});
    resp.send(data);
})
app.put("/update", async (req,resp)=>{
    let data = await product.updateOne({name:req.body.name},{$set:req.body});
    resp.send(data);
})
app.get("/search/:key",async (req,resp)=>{
let data = await product.find({

    "$or":[
        {"name":{$regex:req.params.key}},
        {"price":{$regex:req.params.key}},
        {"brand":{$regex:req.params.key}}
    ]
})
resp.send(data);

})
app.listen(2300);