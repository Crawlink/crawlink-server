var mongoose = require('mongoose'); 


var dbURI = 'mongodb://localhost:27017/server';


connection = mongoose.createConnection(dbURI);



connection.on('connected', function () {  
  console.log('Mongoose connection open to server : ' + dbURI);
}); 

// If the connection throws an error
connection.on('error',function (err) {  
  console.log('Mongoose connection error for server : ' + err);
}); 

// When the connection is disconnected
connection.on('disconnected', function () {  
  console.log('Mongoose disconnected from server.'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
connection.close(function () { 
    console.log('Mongoose disconnected from server through app termination.'); 
    process.exit(0); 
  }); 
}); 

module.exports = connection;