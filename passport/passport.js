const passport  = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');



module.exports = ()=>{
    passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done)=>{
        User
            .findOne({where:{email:email}})
            .then(user=>{
                if(!user){
                    return done(null, false, {msg:"no user"})
                }
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if (err){
                        throw err;
                    }
                    if(isMatch){
                        done (null,user, false)
                    }else{
                        done(null, false,{msg:"password incorect"})
                    }
                })
            })
    })
    )
    
    
    passport.serializeUser(function(user, done) {
      
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id)
           .then(user=>{
              
           done(null, user);
        })
           .catch(err=>{
               console.log(err)
           })
      });
    
}
