const dbConnect = require('./mongodbdata');

let update = async ()=>{
const data = await dbConnect();
const result = data.updateMany({name:'sohan'},{$set:{name:'hero'}});
// if((await result).acknowledged)
//     {
//         console.log('data inserted');
//     }
//     else{
//         console.log('not be sured');
//     }
const responce = await data.find().toArray();
console.warn(responce);
}
update();