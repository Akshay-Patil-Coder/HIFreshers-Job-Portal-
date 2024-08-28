
let a=10;
let b=0;
let wait = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(30)
    },2000)
    
})
wait.then((data)=>{
b=data;
    console.log(a+b)
})

