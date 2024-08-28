const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname,"files");
/*for(i=0;i<=5;i++)
    {
        fs.writeFileSync(dirname+"/hello"+i+".txt","this is my new file");
    }*/
    fs.readdir(dirname,(err,files)=>{
        files.forEach((item)=>{
            console.log(item);

        })

    })
/*const input = process.argv;
if(input[2]=='add')
 {
fs.writeFileSync(input[3],input[4]);
    }
 else if(input[2]=='remove')
    {
        fs.unlinkSync(input[3]);
    }
    else{
        console.log("invalid statement")
    }*/