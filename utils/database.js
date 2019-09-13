const Sequelize = require('sequelize');


const sequelize = new Sequelize('seif','root','benmazouzseifeddine1994', {
    dialect: 'mysql',
    host: 'localhost',
    sync:{
      force:false
    }
    
  })


  module.exports = sequelize;