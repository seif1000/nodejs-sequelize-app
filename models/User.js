const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        unique:true,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true

    },
  
    password:{
        type:Sequelize.STRING,
        allowNull:true
    }

})

module.exports = User;