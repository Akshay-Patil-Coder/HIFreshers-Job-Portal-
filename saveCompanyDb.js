const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.connect("mongodb://localhost:27017/HiFresher");

const savecompanySchema = new mongoose.Schema({
   
   email:String,
   base:[{
    name:String,
   email:String,
   address:String,
   city:String,
   mobileNo:Number,
   jobrole:String,
   requirments:String,
   salary:String,
   description:String,
   active:String
   }]
});
savecompanySchema.methods.addingData=async function(fetch){
   
   this.base=this.base.concat({
      name:fetch.name,
      email:fetch.email,
      address:fetch.address,
      city:fetch.city, 
      mobileNo:fetch.mobileNo,
      jobrole:fetch.jobrole,
      requirments:fetch.name,
      salary:fetch.salary,
      description:fetch.description,
      active:fetch.active
   });
   
   const result = await this.save();

   
}

module.exports = new mongoose.model('Savecomp',savecompanySchema);
