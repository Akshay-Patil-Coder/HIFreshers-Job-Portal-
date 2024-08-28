const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.connect("mongodb://localhost:27017/HiFresher");

const companySchema = new mongoose.Schema({
   
   name:String,
   email:String,
   address:String,
   city:String,
   mobileNo:Number,
   jobrole:String,
   requirments:String,
   salary:String,
   description:String,
   active:String,
   password:String,
   confirmpassword:String,
   tokens:[{
    token:String
   }]
});

module.exports = new mongoose.model('Company',companySchema);
