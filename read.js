const dbConnect = require('./mongodbdata');

dbConnect().then((resp)=>{
    resp.find().toArray().then((data)=>{
console.warn(data);
    })

})