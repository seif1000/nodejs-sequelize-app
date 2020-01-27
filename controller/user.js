
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');


const moment = require('moment')




exports.postRegisterForm  =(req, res, next)=>{
  
   const {email,password,username} = req.body;
   

 
    User.findOne({where:{email:email}}).then(user=>{
        if(user){
          return  console.log('in use')
        }
        User.create({
            username,
            email,
           password
        })
        .then((user)=>{
           
    return  bcrypt.genSalt(10,(err, salt)=>{
                bcrypt.hash(user.password, salt, (err, hash)=>{
                     user.password = hash;
                    user.save()
                     .then((user)=>{
                         req.session.passport = {user:user.id}
                         res.redirect('/profil')
                       })
                   
                })
            })
           
        })
       
        .catch(err=>{
            console.log(err);
        })
    
    })
   
}



exports.postLoginForm =  passport.authenticate('local', { successRedirect: '/home',
    failureRedirect: '/user/login',
    failureFlash: true })

exports.getLgout = (req, res, next)=>{
        req.session.destroy();
        res.redirect('/')
    }





    exports.GetProfile = (req, res, next)=>{
        let profile;
        let followers;
        let followeds;
       
        req.user
                .getProfile()
    
                 .then(pr=>{
                    profile = pr;
                    return req.user.getFollower();
                 })
                 .then(fr=>{
                       followers = fr;
                     return req.user.getFollowed()
                 })
                 .then(foll=>{
                      followeds = foll;
                      return req.user.getPosts()
                 })
                 .then(posts=>{
                    res.render('user/profile',{
                        title:"profile",
                        user:req.user,
                        profile:profile,
                        navImage:profile.image,
                        followers:followers,
                        followeds:followeds,
                        interst:profile.get('interst'),
                        posts:posts,
                        me:req.query.edit,
                        auth:true,
                        moment:moment,
    
                 })    
                    
                    
                 })
    }
    



    exports.CheckProfile = (req, res, next)=>{
        const userId  = req.params.id;
        let profile;
        let followers;
        let followeds;
        let user;
        let posts;
               User
                   .findByPk(userId)
                    .then(u=>{
                    user = u;
                    return  user.getProfile()
    
                    })
                    .then(pr=>{
                        profile = pr;
                        return user.getFollower();
                     })
                     .then(fr=>{
                           followers = fr;
                       return user.getFollowed()
                     })
    
                     .then(foll=>{
                         followeds = foll;
                         return user.getPosts();
                     })
                     .then(ps=>{
                         posts = ps;
                         return req.user.getProfile();
                     })
                     .then(myprofile=>{
                        res.render('user/profile',{
                            title:"profile",
                            user:user,
                            posts:posts,
                            profile:profile,
                            navImage:myprofile.image,
                            followers:followers,
                            followeds:followeds,
                            interst:profile.get('interst'),
                            me:req.query.edit,
                            auth:true,
                            moment:moment
                     })
                     })
        
            .catch(e=>{
                console.log(e);
            })
    
    }

exports.followUser = (req, res, next)=>{
     const userId  = req.body.user;

     User
     .findByPk(userId)
     .then(user=>{
     return req.user
        .addFollowed(user)
     
     })
     .then(()=>{
        res.redirect('back');
     })
     .catch(err=>{
         console.log(err);
     })

}
exports.addAvatar = (req, res, next)=>{
  
    req.user
    .getProfile()
    .then(profile=>{
        console.log(req.file)
      const {path} = req.file;
      const {job} = req.body;
      profile.image = path;
      profile.job  = job;
     return profile.save();
    })
    .then(()=>{
        res.redirect('back');
    })
    .catch(err=>{
        console.log(err);
     })
}
