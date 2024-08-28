const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json());
app.post("/",async (req,resp)=>{

    const data = req.body;
    const token =   await jwt.sign(data,'iamakshaymohanpatilfromsongir');
    console.log(token);
    resp.send(token);
const user = await jwt.verify(token,"iamakshaymohanpatilfromsongir");
console.log(user);
resp.send(user);
});


app.listen(4000,()=>{
    console.log("programming is running");
});


// const connect=async ()=>{

//  const user = await jwt.verify(token,'iamakshaymohanpatilfromsongir');
// console.log(user);

// }
// connect();