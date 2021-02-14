const User=require('../models/user');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
module.exports.postSignup=(req,res,next)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const confirmpassword=req.body.confirmpassword;
    if(password!==confirmpassword){
        return console.log("password mismatch");
    }
    User.find({email:email}).then(user=>{
        if(user.length>0){
            return res.status(401).json({message:"User Already Exist"});
        }
        return bcrypt.hash(password,12).then(encpassword=>{
            const user=new User({
                username:username,
                email:email,
                password:encpassword,
                confirmpassword:encpassword
            });
         user.save();
        }).then(data=>{
            res.status(200).json({
                message:"User signedup Successfully"
            })
        })   
    }).catch(err=>{
        console.log(err);
    })


}

module.exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({email:email}).then(user=>{
        if(!user){
            return res.status(403).json({message:"User email wrong"});
        }
        return bcrypt.compare(password,user.password).then(cmppass=>{
            if(!cmppass){
            return res.status(401).json({message:"Password mismatch"});
            }
            const token=jwt.sign({
                email:email,
                password:password,
                userid:user._id
            },'secret',{expiresIn: 60 * 60})
           return res.status(200).json({
               message:'Login Success',
               userid:user._id,
               token:token
           })
        });
    }).catch(err=>{
        console.log(err)
    })
}