require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const  path = require('path');
const multer = require('multer');
//const  sassMiddleware = require('node-sass-middleware');
const app = express();
const passport = require('passport');
const sequelize = require('./utils/database');
const session = require('express-session');
require('./passport/passport')();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended:false}));

const fileStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
      cb(null, 'images');
    },
    filename:(req, file, cb)=>{
      cb(null, file.filename + '-' + file.originalname)
    }
})
const fliteFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
      cb(null, true);
    }else{
      cb(null, false);
    }

}
app.use(multer({
  storage: fileStorage,
  fileFilter:fliteFilter
}).single('image'));

// //sass
// app.use(sassMiddleware({
//   src: path.join(__dirname, '/sass'),
//   dest: path.join(__dirname, '/public'),

// }));
app.use(express.static(__dirname + '/public'));
app.use('/images',express.static(path.join(__dirname,'images')));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

//routing
require('./utils/route').routing(app);
// associations
require('./utils/association');



const PORT = process.env.PORT || 5000;

sequelize
.sync()

   .then(result=>{
     return result
   })
   .then(()=>{
     app.listen(PORT,()=>{
        console.log('runing')
    })
    
   })
   .catch(err=>{
       console.log(err)
   })

