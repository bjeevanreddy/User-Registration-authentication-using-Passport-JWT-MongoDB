const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
//const db=require('./db');
let userschema=new mongoose.Schema({
    username:{
        type:String,
        required:'username Cannot be Empty'
    },
    email:{
        type:String,
        required:'Email Cannot be empty',
        unique:true
    },
    password:{
        type:String,
        required:'Passoword cannot be empty',
        minlength: [4,"Password must be atleast 4 charcaters"]
    },
    saltSecret: String
});


//validation

userschema.path('email').validate((val)=>{
    emailregex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return  emailregex.test(val);
},'Invalid email');

//methids

userschema.methods.verifyPassword =function(password){
    return bcryptjs.compareSync(password,this.password);
}

userschema.methods.generateJwt=function()
{
    return jwt.sign({_id:this._id},
        process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXP
        });
}
//events

userschema.pre('save',function(next){
    bcryptjs.genSalt(10,(err,salt)=>{
        bcryptjs.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            console.log(hash);
            this.saltSecret=salt;
            next();
        });
    });
});
 const usermodel=mongoose.model("user",userschema);

 module.exports=usermodel;

 