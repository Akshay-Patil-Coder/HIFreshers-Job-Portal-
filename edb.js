const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.connect("mongodb://localhost:27017/HiFresher");

const employeeSchema = new mongoose.Schema({
   
    fname:String,
    lname:String,
    email:String,
    address:String,
    city:String,
    age:Number,
    mobileNo:Number,
    gender:String,
    skills:String,
    jobrole:String,
    description:String,
    active:String,
    password:String,
    confirmpassword:String,
    tokens:[{
     token:String
    }]
});
module.exports = new mongoose.model('Employ',employeeSchema);
