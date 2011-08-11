var express = require('express');
var models = require('./models');
var JaysProvider = require('./jays-memory').JaysProvider;
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
   app.set('views', __dirname + '/views'); 
   app.set('view engine', 'ejs');
   app.use(express.bodyParser());
   app.use(express.methodOverride());
   app.use(express.cookieParser());
   app.use(express.session({ secret: 'your secret here' }));
   app.use(app.router);
   app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
   console.log("Running in development");
});

app.configure('production', function(){
   app.use(express.errorHandler()); 
});

var jayProvider = new JayProvider();

// Routes

app.get('/', function(req, res){
    jayProvider.findAll(function(error, jays)
    {
        res.render('index.jade', { locals: {
            layout: false,
            title: 'Blog',
            jays: jays
            }
        });
        
    });
    //models.getJay('a',function(jay){
    //    res.render('start', {
    //        layout: false,
    //        title: jay.title
    //    });
    //});
});

app.get('/m', function(req, res){
    models.getJay('a',function(jay){
        res.render('mobile', {
            layout: false,
            title: jay.title
        });
    });
});

app.get('/c', function(req, res){
    res.render('cats', {
        layout: false
    });
});

app.listen(process.env.C9_PORT, "0.0.0.0");
