
const Sequelize = require('sequelize');

let sequelize = null;


if (!global.hasOwnProperty('db')) {

  

  if (process.env.DATABASE_URL) {
   
    sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    })
}else{
   sequelize = new Sequelize('seif','root','benmazouzseifeddine1994', {
    dialect: 'mysql',
    host: 'localhost',
    sync:{
      force:false
    }
    
  })
}
}





  module.exports = sequelize;