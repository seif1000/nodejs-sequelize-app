const userRouter = require('../router/user');
const homeRoute = require('../router/home');
const postRouter = require('../router/post');

exports.routing =  (app)=>{
    app.use('/user',userRouter);
    app.use(homeRoute);
    app.use('/post',postRouter);
}

