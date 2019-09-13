const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Like = sequelize.define('like',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    }

})

module.exports = Like;