const User = require('../models/User');
const Profile = require('../models/Profile');

const Floweding = require('../models/Followeding');
const Like = require('../models/Like')
const Post = require('../models/post');
const Answer = require('../models/Answer');



Post.belongsTo(User,  {foreignKey:'fk_username',targetKey:'username', constraints: true, onDelete: 'CASCADE' });

User.hasMany(Post);


Answer.belongsTo(User, {foreignKey:'fk_username',targetKey:'username', constraints: true, onDelete: 'CASCADE' });



Post.hasMany(Answer);
Answer.belongsTo(Post);



Like.belongsTo(User,  {foreignKey:'fk_username',targetKey:'username', constraints: true, onDelete: 'CASCADE' });



Post.hasMany(Like);

Profile.belongsTo(User,
   {foreignKey:'fk_username',targetKey:'username', constraints: true, onDelete: 'CASCADE' },
   );

User.hasOne(Profile);

User.belongsToMany(User,{as:'followed',foreignKey:'follower', through:Floweding});
User.belongsToMany(User,{as:'follower' ,foreignKey:'followed' ,through:Floweding});