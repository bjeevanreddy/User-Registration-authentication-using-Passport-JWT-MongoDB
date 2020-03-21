const express= require('express');
const router=express.Router();
const usercntrl=require('../controllers/user.controller');
const middleware=require('../config/jwtHelper');
router.post('/register',usercntrl.userRegister);

router.post('/authenticate',usercntrl.authenticate);
router.get('/profile',middleware.verifyJwtToken,usercntrl.userProfile);
module.exports=router;