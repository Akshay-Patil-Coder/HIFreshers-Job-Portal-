const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const coockieparser = require('cookie-parser');
const employeeDb = require('./edb');
const companyDb = require('./companyDb');
const saveEmployeeDb = require('./saveEmployeeDb');
const saveCompanyDb = require('./saveCompanyDb');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(coockieparser());
app.use(express.urlencoded({ extended: false }));
let info = undefined;
let company = undefined;

app.get("/", (req, resp) => {
    resp.render('welcome');
});

app.get('/companyNavbar', (req, resp) => {
    resp.render('companyNavbar');
});

app.get('/employeeNavbar', (req, resp) => {
    resp.render('employeeNavbar');
});

app.get("/employeeLogin", (req, resp) => {
    resp.render('employeeLogin');
});

app.post("/employeeLogin", async (req, resp) => {
try{
    const result = await employeeDb.findOne({ email: req.body.email });
    info = req.body.email;
    if (result.password === req.body.password) {
        const item = {
            fname: result.fname,
            lname: result.lname,
            email: result.email,
            address: result.address,
            city: result.city,
            age: result.age,
            mobileNo: result.mobileNo,
            gender: result.gender,
            skills: result.skills,
            jobrole: result.jobrole,
            description: result.description,
            active: result.active
        }
        resp.render('employeeProfile', { item });
    }
    else {
        resp.send('<h1 style="color:skyBlue">Password Or Email Could Not Be Match</h1>');
    }
}catch(error){
    resp.send('<h1 style="color:skyBlue">Password Or Email Could Not Be Match</h1>');

}
});

app.get("/companyLogin", (req, resp) => {
    resp.render('companyLogin');
});

app.post("/companyLogin", async (req, resp) => {
try{
    const result = await companyDb.findOne({ email: req.body.email });
    company = req.body.email;
    if (result.password === req.body.password) {
        const item = {
            name: result.name,
            email: result.email,
            address: result.address,
            city: result.city,
            mobileNo: result.mobileNo,
            jobrole: result.jobrole,
            requirments: result.requirments,
            salary: result.salary,
            description: result.description,
            active: result.active
        };
        resp.render('companyProfile', { item });
    }
    else {
        resp.send('<h1 style="color:skyBlue">Password Or Email Could Not Be Match</h1>');
    }
 } catch(error){
        resp.send('<h1 style="color:skyBlue">Password Or Email Could Not Be Match</h1>');
    
    }
});
app.get("/employeeRegister", (req, resp) => {
    resp.render('employeeRegister');
});

app.post("/employeeRegister", async (req, resp) => {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if (password === confirmpassword) {
        const register = await new employeeDb({

            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            age: req.body.age,
            mobileNo: req.body.mobileNo,
            gender: req.body.gender,
            skills: req.body.skills,
            jobrole: req.body.jobrole,
            description: req.body.description,
            active: req.body.active,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword,
        });
       
        // console.log("the token is of jwt cookie"+req.cookies.jwt);
        //console.log(token);
        const ok = await register.save();
        resp.render('employeeLogin');
        //resp.send(ok);
        //console.log(ok);
    } else {
        resp.send('<h1 style="color:skyBlue">Please Check The Details</h1>');
    }

});

app.get("/companyRegister", (req, resp) => {
    resp.render('companyRegister');
});

app.post("/companyRegister", async (req, resp) => {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if (password === confirmpassword) {
        const register = await new companyDb({

            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            mobileNo: req.body.mobileNo,
            jobrole: req.body.jobrole,
            requirments: req.body.requirments,
            salary: req.body.salary,
            description: req.body.description,
            active: req.body.active,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword,
        });

        //console.log("the token is of jwt cookie"+req.cookies.jwt);
        //console.log(token);
        const ok = await register.save();
        resp.render('companyLogin');
        //resp.send(ok);
        //console.log(ok);
    } else {
        resp.send('<h1 style="color:skyBlue">Please Check The Details</h1>');
    }

});


app.get("/job", async (req, resp) => {
    if (info === undefined) {
        resp.render('notlogin');
    }
    else {
        const item = await companyDb.find();
        resp.render('job', {item});
    }

});
app.post("/job", async (req, resp) => {
    if (info === undefined) {
        resp.render('notlogin');
    }
    else {
        const regex = new RegExp(req.body.search, 'i');
        const item = await companyDb.find({
            $or: [
                { name: { $regex: regex } },
                { city: { $regex: regex } },
                { jobrole: { $regex: regex } },
                { requirments: { $regex: regex } },
                { salary: { $regex: regex } }
            ]
        });
        
        console.log(item);
        console.log(req.body.search);

        resp.render('job', {item});
    }
});

app.get("/employee", async (req, resp) => {
    if (company === undefined) {
        resp.render('notlogin');
    }
    else {
        const item = await employeeDb.find();
        resp.render('employee', {item});
    }

});
app.get('/demo',async (req,resp)=>{
    const item = await employeeDb.find();
    resp.status(200).send(item);
})
app.post("/employee", async (req, resp) => {
    if (company === undefined) {
        resp.render('notlogin');
    }
    else {
        const regex = new RegExp(req.body.search, 'i');
        const item = await employeeDb.find({
            $or: [
                { fname: { $regex: regex } },
                { lname: { $regex: regex } },
                { jobrole: { $regex: regex } },
                { city: { $regex: regex } },
                { skills: { $regex: regex } }
            ]
        });

        console.log(item);
        console.log(req.body.search);

        resp.render('employee', {item});
    }
});

app.get('/logout', (req, resp) => {
    info = undefined;
    company = undefined;
    resp.render('welcome');
})
app.get('/employeeProfile', async (req, resp) => {
    if (info === undefined) {
      resp.render('notlogin');

    }
    else {
        const item = await employeeDb.findOne({ email: info });
        resp.render('employeeProfile', {item});
    }

})
app.get('/companyProfile', async (req, resp) => {
    if (company === undefined) {
        resp.render('notlogin');

    }
    else {
        const item = await companyDb.findOne({ email: company });
        resp.render('companyProfile', { item });
    }

})
app.get('/employeeSave', async (req, resp) => {
    try {
       // console.log(req.query.id);
        if(req.query.id !== undefined)
            {
                const item = await saveCompanyDb.updateOne({email:info},{$pull:{base:{_id: req.query.id} } })
            }
        
    } catch (error) {
        console.log(error);
        
    }
    if (info === undefined) {
        resp.render('notlogin');
    }
    else {
        const item = await saveCompanyDb.findOne({ email: info });
        resp.render('employeeSave', {item});
    }
})
app.get('/companySave', async (req, resp) => {
    try {
        //console.log(req.query.id);
        if(req.query.id !== undefined)
            {
                const item = await saveEmployeeDb.updateOne({email:company},{$pull:{base:{_id: req.query.id} } })
            }
        
    } catch (error) {
        console.log(error);
        
    }
    if (company === undefined) {
        resp.render('notlogin');
    }
    else {
        const item = await saveEmployeeDb.findOne({ email: company });
        resp.render('companySave', {item});
    }
   
})
app.get('/updateEmployee', async (req, resp) => {
    if (info === undefined) {
        resp.render('notlogin');

    }
    else {
        const item = await employeeDb.findOne({ email: info });
        resp.render('updateEmployee', {item});
        //console.log(item);
    }
})
app.get('/updateCompany', async (req, resp) => {
    if (company === undefined) {
        resp.render('notlogin');

    }
    else {
        const item = await companyDb.findOne({ email: company });
        resp.render('updateCompany', {item});
        //console.log(item);
    }
})
app.post('/updateEmployee', async (req, resp) => {
    const data = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        age: req.body.age,
        mobileNo: req.body.mobileNo,
        gender: req.body.gender,
        skills: req.body.skills,
        jobrole: req.body.jobrole,
        description: req.body.description,
        active: req.body.active


    }
    const result = await employeeDb.updateOne({ email: info }, { $set: data });
    resp.render('employeeLogin');
    info = undefined;
});
app.post('/updateCompany', async (req, resp) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        mobileNo: req.body.mobileNo,
        jobrole: req.body.jobrole,
        requirments: req.body.requirments,
        salary: req.body.salary,
        description: req.body.description,
        active: req.body.active


    }
    const result = await companyDb.updateOne({ email: company }, { $set: data });
    resp.render('companyLogin');
    company = undefined;
});
app.get('/infoEmployee',async(req,resp)=>{
    
        const item = await employeeDb.findOne({email:req.query.email});
    resp.render('infoEmployee',{item});
  // console.log("hello"+req.query.email);
    

})
app.get('/infoCompany',async (req,resp)=>{

    const item = await companyDb.findOne({email:req.query.email});
    resp.render('infoCompany',{item});
})
app.get('/saving',async (req,resp)=>{
 const newemail=req.query.email;
 //console.log(email);
 const fetch = await companyDb.findOne({email:newemail});
 const finding = await  saveCompanyDb.findOne({email:info});
  try{
    if(finding.email === info)
    {
        if(fetch.email !== finding.base.email) {
    
        const update = finding.addingData(fetch);
        }
    }
 
}
catch(error){ 
    const result = await new saveCompanyDb({
    email:info,
    base:[{
    name: fetch.name,
    email:fetch.email,
    address: fetch.address,
    city: fetch.city,
    mobileNo: fetch.mobileNO,
    jobrole: fetch.jobrole,
    requirments: req.body.requirments,
    salary: fetch.salary,
    description: fetch.description,
    active: fetch.active,
    }]
 })
 const saving = await result.save();
}
resp.send('<h1 style="color:skyBlue">saved Successfuly</h1>');
})


app.get('/savingComp',async (req,resp)=>{
    const newemail=req.query.email;
    //console.log(email);
    const fetch = await employeeDb.findOne({email:newemail});
    const finding = await  saveEmployeeDb.findOne({email:company});
     try{
       if(finding.email === company)
       {
           if(fetch.email !== finding.base.email) {
       
           const update = finding.addingData(fetch);
           }
       }
    
   }
   catch(error){ 
       const result = await new saveEmployeeDb({
       email:company,
       base:[{
        fname:fetch.fname,
        lname:fetch.lname,
        email:fetch.email,
        address:fetch.address,
        city:fetch.city, 
        age:fetch.age,
        mobileNo:fetch.mobileNo,
        gender:fetch.gender,
        skills:fetch.skills,
        jobrole:fetch.jobrole,
        description:fetch.description,
        active:fetch.active
       }]
    })
    const saving = await result.save();
   }
    resp.send('<h1 style="color:skyBlue">saved Successfuly</h1>');
   })



app.get('/home',(req,resp)=>{
    resp.render('home');
})
app.get('*',(req,resp)=>{
    resp.render('404page');
})
app.get('/notlogin',(req,resp)=>{
    resp.render('notlogin');
})

app.listen(2000, () => {
    console.log("project is running on 2000");
});