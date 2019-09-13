const express = require('express');

const router = express.Router();
const controler = require('../controller/user');





//register user
 router.post('/register', controler.postRegisterForm)

// //post login

router.post('/login', controler.postLoginForm)

//logout
router.get('/logout', controler.getLgout);

//profile

router.get('/profile',controler.GetProfile);

//people profile ()
 router.get('/check-profile/:id',controler.CheckProfile)
//follow user 
router.post('/follow', controler.followUser);
// add-avatar

router.post('/add-avatar',controler.addAvatar);

module.exports = router;
