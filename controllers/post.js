const Post=require('../models/user');
module.exports.getPost=(req,res,next)=>{
    Post.find().then(data=>{
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
    const user=new Post({
        title:title,
        content:content
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
    Post.findById(id).then(data=>{
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

Post.findById(id).then(data=>{
    data.title=title;
    data.content=content;
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
Post.findByIdAndRemove(id).then(data=>{
    res.status(200).json({
        post:data,
        message:'post deleted successfully'
    })
}).catch(err=>{
    console.log(err)
})
}