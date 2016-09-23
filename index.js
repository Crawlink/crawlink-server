var express = require('express');
var mongoose = require('mongoose');


var api = require('./server/api');
var server = require('./server');
var dbConnection = require('./databaseconnection');


var router = express.Router();


router.use('/api', api);
router.use('/', server);


module.exports = router;
