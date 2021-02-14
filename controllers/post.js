const Post=require('../models/post');
const fs=require("fs");
module.exports.getPost=(req,res,next)=>{
    Post.find().populate("user").then(data=>{
        res.status(200).json({
            post:data
        })
    }).catch(err=>{
        console.log(err)
    })

}
module.exports.createPost=(req,res,next)=>{
    const title=req.body.title;
    const content=req.body.content;
    const imageUrl=req.file.path;
    console.log(req.user);
    const user=new Post({
        title:title,
        content:content,
        imageUrl:imageUrl,
        user:req.user
    })
    user.save().then(data=>{
        res.status(200).json({
            message:'Post created Successfully'
        })
    }).catch(err=>{
        console.log(err);
    })
    
}
module.exports.getSinglePost=(req,res,next)=>{
    const id=req.params.id; 
    Post.findById(id).populate("user").then(data=>{
        if(!data){
            return res.status(404).json({
                message:"Post Not Found"
            })
        }
        res.status(200).json({
            singlepost:data
        })
    }).catch(err=>{
        console.log(err)
    })
}
module.exports.updatePost=(req,res,next)=>{
const id=req.params.id;
const title=req.body.title;
const content=req.body.content;
let imageUrl;
if(req.file){
    imageUrl=req.file.path;
}

Post.findById(id).then(data=>{
    data.title=title;
    data.content=content;
    if(imageUrl){
        fs.unlink(data.imageUrl,(err) => {
            console.log('successfully');
          })
        data.imageUrl =imageUrl;  
    }
    return data.save();
}).then(data=>{
    res.status(200).json({
        message:"Post Updated Successfully"
    })
}).catch(err=>{
    console.log(err)
})
}
module.exports.deletePost=(req,res,next)=>{
const id=req.params.id;
Post.findById(id).then(data=>{
    if(!data){
        return res.status(404).json({
            message:"Post Not Found"
        })
    }
    fs.unlink(data.imageUrl,(err) => {
        console.log('successfully');
      })
    return Post.findByIdAndRemove(id).then(data=>{
        res.status(200).json({
        post:data,
        message:'post deleted successfully'
    })
})
}).catch(err=>{
    console.log(err)
})
}



module.exports.searchPost=(req,res,next)=>{
    const searchterm=req.body.searchterm;
    console.log(searchterm);
    Post.find({title:{ $regex: searchterm, $options: "i" }
      }).then(data=>{
        if(data.length < 0){
            return res.status(404).json({
                message:"Post Not Found"
            })
        }
        res.status(200).json({
            post:data
        })
      }).catch(err=>{
          console.log(err);
      })
}