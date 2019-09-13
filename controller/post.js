const Post = require('../models/post');
const Answer  = require('../models/Answer');

const moment = require('moment')




//post add post
const postAddPost = (req, res, next)=>{
    const {title, content} = req.body;
    const image =  req.file.path;
      console.log('image',image);
    
     req.user
       .createPost({
        title:title,
        image:image,
        content:content,
        fk_username:req.user.username
      
     })
    .then(result=>{
       return  req.user.getProfile()
    })
    .then(profile=>{
       
        profile.post +=1
        return profile.save();
    })
    .then(()=>{
        return res.redirect('/home')
    })
}


//post details

const getOnePost = (req, res ,next)=>{
    const postID = req.params.postid;
    let post;
    let Like;
    let A;
    let myUser;
    let myProfile;
    Post
    .findByPk(postID)
    .then(result=>{
        post = result;
        
       return post.getLikes()
     
    })
    .then(likes=>{
        Like = likes;
        return post.getAnswers()
    })
    
    .then(answers=>{
        
        A = answers;
       return post.getUser();
    })
    .then(user=>{
      myUser = user;
     return myUser.getProfile();
      
    })
    .then(prof=>{
        console.log(prof)
        myProfile = prof;
        return req.user.getProfile()
    })
    .then(profile=>{
        
        res.render('post/post-details',{
            title:'post-details',
            post:post.get({plain:true}),
            answers:A,
            likes:Like.length,
            navImage:profile.image,
            myProfile:myProfile,
            auth:true,
            moment:moment
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

// like post

const likePost = (req, res, next)=>{
    const {postID}  = req.body ;
    let fPost;
   // let index ;

    Post
       .findByPk(postID)
       .then(post=>{
           fPost = post;
            return post.getLikes({where:{
                fk_username:req.user.username
            }})
            .then(like=>{
                let likes;
                if(like.length > 0){
                likes = like[0]
            }
            if(likes){  
               
                return likes.destroy()
            }
          
            return  post.createLike({
              fk_username:req.user.username
            }) 
            })
       })
       
       .then(()=>{
           res.redirect('back')
       })
    
       .catch(err=>{
            console.log(err)
    })
}

// comment post

const CommentPost = (req, res, next)=>{
    const  content = req.body.content;
    const   postID = req.body.postID;
    let fetchedPost;

       Post
       .find({where:{
               id:postID
           }})
           .then(post=>{
               fetchedPost = post;

               return req.user.getProfile();
            
           })
           .then(profile=>{
                  
            return fetchedPost.createAnswer({
                content:content,
                postId:postID,
                img:profile.image,
                fk_username:req.user.username
            })
           })
        .then(()=>{
            req.user
               .getProfile()
               .then(profile=>{
                   profile.response +=1;
                   return profile.save();
               })
        })
          
         .then(()=>{
                    res.redirect('back');
        })
        .catch(err=>{
                   console.log(err)
               })
           
           
}



module.exports = {
 
    postAddPost,

    getOnePost,
    likePost,
    CommentPost,
   
}