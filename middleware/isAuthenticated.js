

exports.isAuth = (req, res, next)=>{
    if(req.user){
        return next()
    }
    res.redirect('/')



}

exports.isProfile = (req, res, next)=>{
    req.user.getProfile()
    .then(profile=>{
        if(profile){
        //    console.log(profile.get('interst'))
           return next()
        }
            res.redirect('/profil')
        
    })
    .catch(err=>{
        console.log(err)
    })
}

