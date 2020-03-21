const express=require('express');
const bodyParser=require('body-parser');
const config=require('./config/config');
const db=require('./models/db');
const cors=require('cors');
require('./config/passportConfig');
const passport=require('passport');
const userrouter=require('./routers/user.router');
const app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api',userrouter);

//error validation

app.use((err,req,res,next)=>{
    if(err.name=='ValidationError'){
        var valErrors=[];
        Object.keys(err.errors).forEach(key=>valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});
//server
app.listen(process.env.PORT,()=>{
    console.log(`Server Connected on :${process.env.PORT} `);
})