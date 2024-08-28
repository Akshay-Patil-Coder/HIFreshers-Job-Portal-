const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/akshay");
const productSchema = new mongoose.Schema({

    name:String,
    fees:Number,
    class:String
});

const saveInDb = async ()=>{
const productModel = mongoose.model('demo',productSchema);
let data = new productModel({name:"sagar"});
const result = await data.save();
console.log(result);
}
//saveInDb();
const updateInDb = async () =>{
    const productModel = mongoose.model('demos',productSchema);
    const data = await productModel.updateOne(
        {name:"sagar"},
        {
            $set:{fees:30000,class:"imca"}

        }
    )
    console.log(data);

}
//updateInDb();
const deleteInDb = async ()=>{
    const productModel = mongoose.model('demos',productSchema);
    let data = await productModel.deleteMany({name:"shriram"})
    console.log(data);

}
//deleteInDb();
const findInDb = async ()=>{
    const productModel = mongoose.model('demos',productSchema);
    let data = await productModel.find({class:"imca"});
console.log(data);
}
findInDb();