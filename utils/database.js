const Sequelize = require('sequelize');

const config = require('../config/config');

const {port,password,user,database,dialect,host}  = config

const sequelize = new Sequelize(database,user, password,
  {
   host:host,
   dialect:dialect,
   
}
  
)

  


  module.exports = sequelize;