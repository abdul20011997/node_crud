const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const app=express();
const postRouter=require('./routes/post');
app.use(bodyParser.json())
app.use('/',(req,res,next)=>{
    console.log('node works');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();

})
app.use('/feed',postRouter);
mongoose.connect('mongodb+srv://Sahul:Sahul1997@cluster0.ocnj2.mongodb.net/crud?retryWrites=true&w=majority').then(res=>{
    app.listen(4000);
}).catch(err=>{
console.log(err);
})