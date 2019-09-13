const Sequelize = require('sequelize');

const sequelize = require('../utils/database');


const Answer= sequelize.define('answer',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    content:{
        type:Sequelize.STRING,
     
    },
    img:Sequelize.STRING
 

})

module.exports = Answer;