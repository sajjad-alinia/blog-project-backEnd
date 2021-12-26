// =========== connect to database ==========
const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const db = new Sequelize('blog-project-db', 'root', '', {
    host: 'localhost',
    dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

db.authenticate()
    .then(() => console.log("database connected ..."))
    .catch(err => console.log("database Error = " + err));

module.exports = db;