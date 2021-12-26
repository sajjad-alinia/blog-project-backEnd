const sequelize = require('sequelize');
const db = require('../config/database');

const Posts = db.define('Posts', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: sequelize.STRING,
        allowNull: false
    }
})

module.exports = Posts;