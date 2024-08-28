const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.connect("mongodb://localhost:27017/HiFresher");

const saveemployeeSchema = new mongoose.Schema({
   email:String,
    base:[{
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
    active:String
    }]
});
saveemployeeSchema.methods.addingData=async function(fetch){
   
    this.base=this.base.concat({
       fname:fetch.fname,
       lname:fetch.lname,
       email:fetch.email,
       address:fetch.address,  
       city:fetch.city, 
       age:fetch.age,
       mobileNo:fetch.mobileNo,
       gender:fetch.gender,
       skills:fetch.skills,
       jobrole:fetch.jobrole,
       description:fetch.description,
       active:fetch.active
    });
    
    const result = await this.save();
 
    
 }
 

module.exports = new mongoose.model('SaveEmploy',saveemployeeSchema);
