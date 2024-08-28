const express = require('express');
const mongoose= require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost:27017/akshay');
const schema = new mongoose.Schema({
  name:String,
  poduct:String,
  price:Number
});
const model = mongoose.model('demos',schema);

app.post('',async(req,resp)=>{
  const result = new model(req.body);
  const data =await  result.save();
  resp.send(data);
});
app.put('',async(req,resp)=>{
  const result =await model.updateOne({name:req.body.name},{$set:req.body.name});
 
  resp.send(result);
});
app.delete('',async(req,resp)=>{
  const result = await model.deleteOne({name:req.body.name});
 
  resp.send(result);
});
app.get('',async(req,resp)=>{
  const result = await model.find().toArray();
 
  resp.send(result);
});
app.listen(2000);
