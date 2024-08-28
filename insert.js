const dbConnect = require('./mongodbdata');

let insert = async ()=>{
const data = await dbConnect();
const result = data.insertOne({
name:'sohan',class:'imrd'
})
if((await result).acknowledged)
    {
        console.log('data inserted');
    }
    else{
        console.log('not be sured');
    }
const responce = await data.find().toArray();
console.warn(responce);
}
insert();