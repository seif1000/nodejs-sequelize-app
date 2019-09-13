const express = require('express');
const router = express.Router();
const controler = require('../controller/home');
const midll = require('../middleware/isAuthenticated');


router.get('/',controler.getIndex);

router.get('/home',  midll.isAuth,midll.isProfile, controler.getHome);

router.get('/profil', midll.isAuth, controler.completProfile)

router.post('/profile',controler.postProfile);


module.exports = router;