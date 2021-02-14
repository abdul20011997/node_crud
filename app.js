const express=require('express');
const path=require('path');
const {v4: uuidv4}=require("uuid");
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const app=express();
const postRouter=require('./routes/post');
const signupRouter=require('./routes/user');
const multer=require("multer");
const storage = multer.diskStorage({
    destination: (req,file,cb)=> {
      cb(null, './images')
    },
    filename: (req,file,cb)=> {
      cb(null, uuidv4() )
    }
  })
  const fileFilter =(req,file,cb)=>{
      if(file.mimetype==="image/png" || file.mimetype=="image/jpeg" || file.mimetype=="image/jpg"){
          cb(null,true);
      }
      else{
        cb(null,false);
      }
  }
app.use(bodyParser.json())
app.use(multer({ storage: storage ,fileFilter :fileFilter }).single('imageUrl'))
app.use('/images',express.static(path.join(__dirname,'images')));

  
app.use('/',(req,res,next)=>{
    console.log('node works');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();

})
app.use(signupRouter);
app.use('/feed',postRouter);

mongoose.connect('mongodb+srv://Sahul:Sahul1997@cluster0.ocnj2.mongodb.net/crud?retryWrites=true&w=majority').then(res=>{
    app.listen(4000);
}).catch(err=>{
console.log(err);
})