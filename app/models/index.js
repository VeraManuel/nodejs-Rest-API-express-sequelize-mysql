'use strict'

var dbConfing = require('../../config/db.config');

var Sequelize = require('sequelize');
var sequelize = new Sequelize(dbConfing.DB, dbConfing.USER, dbConfing.PASSWORD, {
    host: dbConfing.HOST,
    dialect: dbConfing.dialect,
    operatoraliases: false,

    pool: {
        max: dbConfing.pool.max,
        min: dbConfing.pool.min,
        acquire: dbConfing.pool.acquire,
        idle: dbConfing.pool.idle
    }
});

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize);

module.exports = db;