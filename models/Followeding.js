const Sequelize = require('sequelize');

const sequelize = require('../utils/database');


const Followding= sequelize.define('followding',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
  
 

})

module.exports = Followding;