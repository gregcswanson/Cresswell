var express = require('express');
var everyauth = require('everyauth');
//var models = require('./models');
//var JaysProvider = require('./jays-memory').JaysProvider;
var JaysProvider = require('./jays-mongodb').JaysProvider;

//everyauth.google
//  .appId('YOUR CLIENT ID HERE')
//  .appSecret('YOUR CLIENT SECRET HERE')
//  .scope('https://www.google.com/m8/feeds') // What you want access to
//  .handleAuthCallbackError( function (req, res) {
    // If a user denies your app, Google will redirect the user to
    // /auth/facebook/callback?error=access_denied
    // This configurable route handler defines how you want to respond to
    // that.
    // If you do not configure this, everyauth renders a default fallback
    // view notifying the user that their authentication failed and why.
//  })
//  .findOrCreateUser( function (session, accessToken, accessTokenExtra, googleUserMetadata) {
    // find or create user logic goes here
    // Return a user or Promise that promises a user
    // Promises are created via
    //     var promise = this.Promise();
//  })
//  .redirectPath('/');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
   app.set('views', __dirname + '/views'); 
   app.set('view engine', 'ejs');
   app.register(".html", require("ejs")); // Register EJS to process the server html
   app.set('view options', {
        open: '{{',
        close: '}}'
    }); // Change the open and close tags, no real reason
   app.use(express.bodyParser());
   app.use(express.methodOverride());
   app.use(express.cookieParser());
   app.use(express.session({ secret: 'CrezwellInVegas2021' }));
   app.use(everyauth.middleware());
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
    res.render('index.html',{
        layout: 'layout.html',
        page: 'home'
    });
});

app.get('/vegasreunion', function(req, res){
    res.render('vegasreunion.html',{
        layout: 'layout.html',
        page: 'vegasreunion'
    });
});

app.get('/wall', function(req, res){
    res.render('wall.html',{
        layout: 'layout.html',
        page: 'wall'
    });
});

app.get('/api/wall', function(req, res){
    res.send(
            {
                status: "success", // "fail","error"
                message: 'get not implemented',
                data: 'all'
            }
        );
});

app.get('/api/wall/:id', function(req, res){
    res.send(
            {
                status: "success",
                message: 'get not implemented',
                data: 'get(' + req.params.id + ')'
            }
        );
});

app.put('/api/wall/:id', function(req, res){
    var wallPost = {title: req.body.title , body: req.body.title.body};
    res.send(
            {
                status: "success",
                message: 'put not implemented',
                data: 'put(' + wallPost.title + ')'
            }
        );
});

app.post('/api/wall', function(req, res){
    var wallPost = {title: req.body.title , body: req.body.title.body};
    res.send(
            {
                status: "success",
                message: 'post not implemented',
                data: 'post(' + wallPost.title + ')'
            }
        );
});

app.delete('/api/wall/:id', function(req, res){
    res.send(
            {
                status: "success",
                message: 'delete not implemented',
                data: 'delete(' + req.params.id + ')'
            }
        );
});

/*
app.get('/response', function(req, res){
    //res.render('home.html', {
    res.render('responsiveweb.html',{
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

app.get('/jayson', function(req, res){
    res.render('jayhome.html', {
        layout: false,
        locals: { title: 'jQuery Templates' }
    });
});

app.get('/jayson/all', function(req, res) {
    console.log("/jayson/all");
    jayProvider.findAll(function(error, jays)
    {
        res.send(
            {
                success: true,
                title: 'Blog',
                data: jays
            }
        );
    });   
});

app.get('/jayson/:id', function(req, res) {
    jayProvider.findById(req.params.id, function(error, jay) {
        res.send(
            {
                success: true,
                data: jay
            }
        );
    });
});

app.post('/jayson/new', function(req, res){
    jayProvider.save(
        {
            title: req.param('title'),
            body: req.param('body')
        }, 
        function( error, docs) {
            res.send(
            {
                success: true,
                message: ''
            }
        );
    });
});
*/

//app.listen(process.env.C9_PORT, "0.0.0.0");
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});