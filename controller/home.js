const Post = require('../models/post');
const User = require('../models/User');
const Profile = require('../models/Profile');
const moment = require('moment');


exports.getIndex = (req, res, next)=>{
    res.render('user/register',{
        title:"wellcome back",
        auth: false
    })
}


exports.getHome =  (req, res, next)=>{
    let Pintrest;
    let myProfile;
    let matchProfile;
    let associatUserId;
    let associatUser;
    req.user
        .getProfile()
        .then(profile=>{
                myProfile = profile;
                intrest = profile.get('interst');
                    Pintrest = intrest;
                    return Pintrest;
            })
        .then(interst=>{
            return Profile.findAll({
                where:{
                    userId:{
                        $notIn:[req.user.id]
                    }
                  }
            })
        })
        .then(profils=>{
            matchProfile = profils.filter(profil=> profil.get('interst').some(r=>Pintrest.includes(r)))
            return matchProfile
        })
        .then(profils=>{
            return  profils.map(p=>{
                    return p.userId
                })
            
        })
        .then(user=>{
            associatUserId = user;
            return User.findAll({
                 where:{
                    id:user
                }
            })
        })
        .then((users)=>{
            associatUser = users;
            return  Post.findAll({
                    where:{
                    userId: associatUserId
                    }
                })
        })
        .then(posts=>{
       
            res.render('home',{

                title:'posts',
                posts:posts,
                users:associatUser,
                auth:true,
                user:req.user,
                profile:myProfile,
                navImage:myProfile.image,
                matchProfile:matchProfile,
                intrest:Pintrest,
                moment:moment,
            })
        })
        .catch(err=>{
            console.log(err)
        })
      
}

exports.completProfile = (req, res, next)=>{
  
    res.render('profile',{
        title:"profil",
        user:req.user.username
    })
}

exports.postProfile = (req, res, next)=>{
   

  
        req.user
        .createProfile({
            interst:req.body.interst.join(';'),
            fk_username:req.user.username
        })
        .then(()=>{
            res.redirect('/home')
        })
        .catch(err=>{
           console.log(err)
        })
    
   
}