const express = require('express');
const app = express();
const conn = require('./connection');
app.use(express.json());
app.get("/",(req,resp)=>{
conn.query("select * from user",(err,result)=>{
   if(err)
    {
        resp.send('error');
    }
    else{ 
        resp.send(result);

    }
   
   
})

});

app.post("/",(req,resp)=>{
let data =req.body;
conn.query("INSERT INTO user SET? ",data,(err,result,fields)=>{

    if(err) throw err;
    resp.send(result);
});

})
app.put("/:id ",(req,resp)=>{
    let data =[req.body.name,req.body.age,req.body.class,req.params.id];
    conn.query("UPDATE user SET name=? ,age=? ,class=? WHERE id=?",data,(err,result)=>{
    
        if(err) throw err;
        resp.send(result);
    });
    
    })
    app.delete("/:id ",(req,resp)=>{
       
        conn.query("DELETE FROM user WHERE id = ?",req.params.id,(err,result)=>{
        
            if(err) throw err;
            resp.send(result);
        });
        
        })
app.listen(2300);