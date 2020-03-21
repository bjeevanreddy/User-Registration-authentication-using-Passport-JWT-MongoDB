const mongoose =require('mongoose');
const model=require('./user.model');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },(err)=>{
    if(!err)
        console.log("DataBase mongodb connected");
    else{
        console.log("Not Connected to DB :" + JSON.stringify(err,undefined,2));
    }
});

module.exports=model;