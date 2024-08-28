const express = require('express');
const mysql = require('mysql');
const app = express();
const con = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"demo"

});
con.connect((err)=>{
  
  if(err)throw err;
  console.log("connected");
});
app.get('',(req,resp)=>{
  con.query("select * from user",(err,result)=>{
    if(err)throw err;
    console.log(result);
    resp.send(result);
  })
});
app.post('',(req,resp)=>{
  const data = req.body;
  con.query("INSERT INTO user SET?",data,(err,result,fields)=>{
    if(err)throw err;
    console.log(result);
    resp.send(result);
  })
});
app.put('/:key',(req,resp)=>{
  const data=[req.body.name,req.body.age,req.body.class,req.params.key]
  con.query("UPDATE user SET name=?,age=?,class=? WHERE id=?",data,(err,result)=>{
    if(err)throw err;
    console.log(result);
    resp.send(result);
  })
});
app.delete('/:id',(req,resp)=>{
  con.query("DELETE FROM user WHERE id=?",req.params.id,(err,result)=>{
    if(err)throw err;
    console.log(result);
    resp.send(result);
  })
});
app.listen(2300);