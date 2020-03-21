const jwt=require('jsonwebtoken');

const middleware ={
    verifyJwtToken: async function(req,res,next){
        var token;
        if('authorization' in req.headers)
        {
            token=req.headers['authorization'].split(' ')[1];

        }
        if(!token) return res.status(403).send({auth: false,message: "NO token provided"});
        else return jwt.verify(token,process.env.JWT_SECRET,
            (err,decoded)=>{
                if(err)
                {
                    return res.status(500).send({auth:false,message:"Token Authentixation failed"});
                }
                else{
                    req._id=decoded._id;
                    next();
                }
            })
         
    }
}

module.exports=middleware;