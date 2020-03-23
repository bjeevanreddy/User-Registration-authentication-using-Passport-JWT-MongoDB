//const usermodel=require('../models/user.model');

const mongoose=require('mongoose');
const usermodel=require('../models/user.model')
//const usermodel=mongoose.model('user');
const passport=require('passport');
const _=require('lodash');
const userController = {
    userRegister: async function (req,res,next)
    {
        try{
            
            let user=new usermodel();
            user.username=req.body.username;
            user.email=req.body.email;
            user.password=req.body.password;
            user.save((err, doc)=>{
                if(!err)
                {
                    res.send(doc);
                }else{
                    if(err.code == 11000) {res.send(["Duplicate Data"]);}
                    else {
                        return next(err);
                    }
         
                }
            })

        }catch(error){s
            res.send("hey babe");
        }
    },
    authenticate: async function (req,res,next){
        try{
            passport.authenticate('local',(err,user,info)=>{
                if(err) return res.status(400).json(err);

                //regsitered user
                else if(user)  return res.status(200).json({"token":user.generateJwt()});

                //unknown user or wrong passwrod

                else return res.status(404).json(info);
            })(req,res);
        }catch(err)
        {

        }
    },
    userProfile:async function(req,res,next){
        try{
            usermodel.findOne({_id:req._id},
                (err,user)=>{
                    if(!user)
                    {
                        return res.status(404).json({status:false,message: "USer record not found"});
                    }
                    else return res.status(200).json({status:true,user:_.pick(user,['username','email'])});
                })
        }catch(error)
        {

        }
    }
};

module.exports=userController;