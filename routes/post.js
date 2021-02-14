const express=require('express');
const post=require('../controllers/post');
const auth=require('../middleware/is-auth');


const router=express.Router();
router.get('/singlepost/:id',auth.isAuth,post.getSinglePost);
router.get('/post',auth.isAuth,post.getPost);
router.post('/post',auth.isAuth,post.createPost);
router.post('/search',auth.isAuth,post.searchPost);
router.put('/post/:id',auth.isAuth,post.updatePost);
router.delete('/post/:id',auth.isAuth,post.deletePost);



module.exports=router;