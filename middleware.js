module.exports = reqFilter = (req,resp,next)=>{

    if(!req.query.age){
        resp.send('<h1>please enter the age</h1>');
    }
    else if(req.query.age<18)
        {
            resp.send('<h1>your not eligible to this page</h1>');
        }
        else{
            next();
        }
};
