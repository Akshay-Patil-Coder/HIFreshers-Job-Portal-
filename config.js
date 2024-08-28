const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/akshay");
const productSchema = new mongoose.Schema({

    name:String,
    price:Number,
    brand:String
})

module.exports = mongoose.model('demos',productSchema);