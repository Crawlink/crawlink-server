var express = require('express');


var dbConnection = require('../databaseconnection');


var router = express.Router();


router.use('/', function(req, res, next) {
  res.send("server/api :" +req.method +' : '+ req.url);
});


module.exports = router;
