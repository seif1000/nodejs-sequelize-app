const express = require('express');

const router = express.Router();

const controler = require('../controller/post');

const midll = require('../middleware/isAuthenticated');



router.post('/add-post', midll.isAuth, controler.postAddPost);


//post detail

router.get('/:postid',midll.isAuth, controler.getOnePost);


//like post
router.post('/like', midll.isAuth ,controler.likePost)

//add comment

router.post('/add-comment', midll.isAuth, controler.CommentPost);



module.exports = router;