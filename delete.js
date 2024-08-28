const dbConnect = require('./mongodbdata');

let deleteData = async ()=>{
const data = await dbConnect();
const result = data.deleteMany({name:'hero'})
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

deleteData();