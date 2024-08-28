const express = require('express');
const reqFilter = require('./middleware')
const app = express();
const route = express.Router();
route.use(reqFilter);

app.get('/',(req,resp)=>{
    resp.send('<h1>this is home page</h1>');
})
route.get('/about',(_,resp)=>{
    resp.send('this is a about page');
});
route.get('/contact',(_,resp)=>{
    resp.send('this is a contact page');
});
app.use('/',route);
app.listen(6200);