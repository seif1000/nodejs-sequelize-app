const Sequelize = require('sequelize');

const sequelize = require('../utils/database');


const Profile = sequelize.define('profile',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    
    post:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    response:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    image:{
      type:  Sequelize.STRING,
      defaultValue:"images/u.png",
    },
   
    interst:{
        type:Sequelize.STRING,
        get(){
           return  this.getDataValue('interst').split(';')
        }
    }
})

module.exports = Profile;