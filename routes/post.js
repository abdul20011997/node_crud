const express=require('express');
const post=require('../controllers/post');

const router=express.Router();
router.get('/singlepost/:id',post.getSinglePost);
router.get('/post',post.getPost);
router.post('/post',post.createPost);
router.put('/post/:id',post.updatePost);
router.delete('/post/:id',post.deletePost);



module.exports=router;