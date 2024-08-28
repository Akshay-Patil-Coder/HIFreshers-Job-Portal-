const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function dbConnect(){

    let result = await client.connect();
    let db = result.db('akshay');
    return db.collection('demo');
//     let responce= await collection.find().toArray();
// console.log(responce);
}
module.exports = dbConnect;