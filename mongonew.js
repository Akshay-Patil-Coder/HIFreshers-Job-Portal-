const express= require('express');
const {MongoClient}= require('mongodb');
const app = express();
const url ='mongodb://localhost:27017';
const client = new MongoClient(url);
async function dbConnect(){
    let result = await client.connect();
    let db= result.db('akshay');
    return db.collection('demo');
}
app.get('/',async (req,resp)=>{
let data= await dbConnect();
let result = await data.find().toArray();
resp.send(result);
});
app.post('/',async (req,resp)=>{
    let data= await dbConnect();
    let result = await data.insertOne(req.body);
    resp.send(result);
    });
app.put('/',async (req,resp)=>{
        let data= await dbConnect();
        let result = await data.updateOne({name:req.body.name},{$set:req.body});
        resp.send(result);
        });
    app.delete('/',async (req,resp)=>{
            let data= await dbConnect();
            let result = await data.deleteOne({name:req.body.name});
            resp.send(result);
            });
        
        app.listen(5000,()=>{
          console.log('this is project running');
        }); 
    
