const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname,'crud');
const filepath= dirname+"/apple.txt";
//fs.writeFileSync(filepath,'this is just a demo');
        // fs.readFile(filepath,'utf-8',(err,item)=>{
        //     console.log(item);
        // })
        // fs.appendFile(filepath,'and file name is apple.txt',(err)=>{

        //     if(!err) console.log('file updated');
        // })
// fs.rename(filepath,dirname+"/fruit.txt",(err)=>{
//     if(!err) console.log('file name is changed');
// })
fs.unlinkSync(dirname+"/fruit.txt");