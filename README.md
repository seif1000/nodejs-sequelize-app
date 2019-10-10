# nodejs-sequelize-app
express app with signup and login. create, update post .upload image ,using express and sequelize

## Index
+ [Demo](#demo)
+ [Features](#features)
+ [Installation](#installation)

## Demo<a name="demo"></a>
Check [Demo](https://murmuring-atoll-22449.herokuapp.com/)

## Features<a name="features"></a>
+ Uses Express as the application Framework.
+ Manages Sessions using [express-session](https://github.com/expressjs/session) package.
+ Authenticates via username and password using [Passport](https://github.com/jaredhanson/passport).
+ using sequelize ORM as database [sequelize](https://sequelize.org/) in development.
+ using postgresql in production with heroku addons
+ upload user and post image with multer [multer](https://github.com/expressjs/multer)
+ using ejs template engine [ejs](https://ejs.co/)

## Installation<a name="installation"></a>
### Running Locally
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1. Clone or Download the repository

	```
	$ git clone https://github.com/seif1000/nodejs-sequelize-app.git
	$ cd nodejs-sequelize-app
	```
2. Install Dependencies

	```
	$ npm install
	```

4. Start the application

	```
	$ npm start
	```
Your app should now be running on [localhost:8080](http://localhost:8080/).

