var express = require('express');
//var models = require('./models');
//var JaysProvider = require('./jays-memory').JaysProvider;
var JaysProvider = require('./jays-mongodb').JaysProvider;
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

//var jayProvider = new JayProvider();
var jayProvider = new JayProvider('localhost',27017);

// Routes

app.get('/', function(req, res){
    res.render('home.ejs', {
        layout: false
    });
});

app.get('/jays', function(req, res){
    jayProvider.findAll(function(error, jays)
    {
        res.render('jays.jade', { locals: {
            title: 'Blog',
            jays: jays
            }
        });
    });
});

app.get('/jays/new', function(req, res) {
    res.render('jays_new.jade', { locals: {
        title: 'New Jay'
    }
    });
});

app.get('/jay/:id', function(req, res) {
    jayProvider.findById(req.params.id, function(error, jay) {
        res.render('jay.jade',
        { locals: {
            title: jay.title,
            jay: jay
        }
        });
    });
});

app.post('/jays/new', function(req, res){
    jayProvider.save({
        title: req.param('title'),
        body: req.param('body')
    }, function( error, docs) {
        res.redirect('/jays');
    });
});

app.get('/m', function(req, res){
    models.getJay('a',function(jay){
        res.render('mobile', {
            layout: false,
            title: jay.title
        });
    });
});

app.get('/h', function(req, res){
    res.render('home.ejs', {
        layout: false
    });
});

app.get('/cd', function(req, res){
    res.render('countdown', {
        layout: false
    });
});

app.listen(process.env.C9_PORT, "0.0.0.0");
