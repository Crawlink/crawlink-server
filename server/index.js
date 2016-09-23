var express = require('express');
var router = express.Router();


var dbConnection = require('../databaseconnection');


router.use('/', function(req, res, next) {
  res.send("server :" + req.method +' : '+ req.url);
});




module.exports = router;
