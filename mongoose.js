const express= require('express');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/akshay");
const schema = new mongoose.schema({

  
    name:String,
    fees:Number,
    class:String

});

app.get("/");
