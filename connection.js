const mysql = require('mysql');
const con = mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'demo'

});
con.connect((err)=>{

    if(err){
        console.log("not connected")
    }
    else{
        console.log("connected")
    }
})
module.exports = con;