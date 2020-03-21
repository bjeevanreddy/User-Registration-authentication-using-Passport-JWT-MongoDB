const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const user=require('../models/user.model');
//const user=mongoose.model('user');
passport.use(
    new localStrategy({usernameField:'email'},
    (username,password,done)=>{
        user.findOne({email:username},
            (err,user)=>{
                if(err){
                    return done(err);
                }
                else if(!user){
                    return done(null,false,{message: "Email is not registered"});
                }
                else if(!user.verifyPassword(password)){
                    return done(null,false,{message:"wrong password"});
                }
                else
                    return done(null,user);
            });

})
);