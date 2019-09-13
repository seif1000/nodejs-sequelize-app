const Sequelize  = require('sequelize');

const sequelize = require('../utils/database');


const Post = sequelize.define('post',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    image:Sequelize.STRING,
    content:{
        type: Sequelize.STRING,
        allowNull:false

    },
    
})

module.exports = Post;