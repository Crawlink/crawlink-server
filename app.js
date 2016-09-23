var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var domains = require('./domains');

app.use(function (req, res, next) {

    // All requests are landing here to find its apropriate source folder. 
    // When your domain list too big use a better algorighm to
    // identify apropriate source folder path.
    // Sorce folder path is indivisual nodejs server. See ./domains.js for more infomation
    // 
    for (var i = 0; i < domains.length; i++) {
        var domain = domains[i];
        // console.log('checking for ' + domain.name);
        var reuestedHostname = req.query.hostname || req.hostname;
        if (reuestedHostname.indexOf(domain.hostname) > -1) {
            var newUrl = '/' + domain.hostname;
            if (req.url !== '/') {
                newUrl += req.url;
            }
            req.url = newUrl;
            console.log('new URL : ' + req.url)
            break;
        }
    }


    next();

});


for (var i = 0; i < domains.length; i++) {
    var domain = domains[i];
    console.log('domain :' + domain.path);
    app.use('/' + domain.hostname, require(domain.path));
}

app.use('/', require('./index'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
