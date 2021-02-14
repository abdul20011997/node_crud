const jwt=require('jsonwebtoken');

module.exports.isAuth=(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({
            message:"token not exists"
        })

    }
    let verifiedtoken;
    try{
         verifiedtoken=jwt.verify(token,"secret");
    }
    catch(err){
        console.log(err);
    }
    if(!verifiedtoken){
        return res.status(401).json({
            message:"token not exists"
        })
    }
    req.user=verifiedtoken.userid;
    next();
}