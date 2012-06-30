var express = require('express'), 
    Db = require('mongodb').Db, 
    Server = require('mongodb').Server;

console.log("starting application ");

var db = new Db('cloud', new Server('flame.mongohq.com', 27106, {}), {auto_reconnect: true});

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
   //app.use(everyauth.middleware());
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

// Routes
app.get('/', function(req, res){
    res.render('index.html',{
        layout: 'layout.html',
        page: 'home'
    });
});

app.get('/vegasreunion', function(req, res){
    res.render('vegasreunion.html', {
        layout: 'layout-clean.html',
        page: 'vegasreunion'
    });
});

app.get('/app', function(req, res){
    res.render('app.html', {
        layout: 'layout.html',
        page: 'app'
    });
});

app.get('/wall', function(req, res){
    res.render('wall.html', {
        layout: 'layout.html',
        page: 'wall'
    });
});

app.get('/notes', function(req, res){
    db.collection('jays', function(err, c) {
        c.find({}).toArray(function(err, items) {
            res.render('notes.html', {
                layout: 'layout.html',
                page: 'notes',
                'items': items
            });
        });
    });
});

app.get('/api/notes', function(req, res){
    db.collection('jays', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
            if(err) {
                res.send({status: "error", message: err, data: '' });
            } else {
                res.send({status: "success", message: "", data: items });
            }
        }); 
    });
});

app.get('/api/notes/:id', function(req, res){
    db.collection('jays', function(err, c) {
        c.findOne({"_id":req.params.id}, 
            function(err, item) {
                console.log(err);
                if(err) {
                    res.send({status: "error", message: err, data: '' });
                } else {
                    res.send({status: "success", message: req.params.id, data: item });
                }
            }
        );
    });
});

app.get('/maps', function(req, res){
    res.render('maps.html', {
        layout: 'layout.html',
        page: 'maps'
    });
});

app.get('/api/wall', function(req, res){
    res.send({
                status: 'success',
                message: 'get not implemented',
                data: 'all'
            });
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

app.get('/api/level1', function(req, res){
    res.send(
            {
                status: "success",
                message: '',
                data: [{id: '1', name: 'Level 1 (a)'},
                    {id: '2', name: 'Level 1 (b)'},
                    {id: '3', name: 'Level 1 (c)'}]
            }
        );
});

app.get('/api/level2/:level1', function(req, res){
    res.send(
            {
                status: "success",
                message: '',
                data: [{id: '1', name: 'Level ' + req.params.level1 + ' (a)'},
                    {id: '2', name: 'Level ' + req.params.level1 + ' (b)'},
                    {id: '3', name: 'Level ' + req.params.level1 + ' (c)'}]
            }
        );
});

app.get('/api/level3/:level1/:level2', function(req, res){
    res.send(
            {
                status: "success",
                message: '',
                data: [{id: '1', name: 'Level ' + req.params.level1 + '.' + req.params.level2 + ' (a)'},
                    {id: '2', name: 'Level ' + req.params.level1 + '.' + req.params.level2 + ' (b)'},
                    {id: '3', name: 'Level ' + req.params.level1 + '.' + req.params.level2 + ' (c)'}]
            }
        );
}); 
 
app.get('/api/level4/:level2', function(req, res){
    res.send(
            {
                status: "success",
                message: '',
                data: [{id: '1', name: 'Level ' + req.params.level2 + ' (a)'},
                    {id: '2', name: 'Level ' + req.params.level2 + ' (b)'},
                    {id: '3', name: 'Level ' + req.params.level2 + ' (c)'}]
            }
        );
});

//app.listen(process.env.C9_PORT, "0.0.0.0");
var port = process.env.PORT || 3000;

db.open(function(err) {
    console.log('authenticating');
    db.authenticate(
        'test', 
        'test123', 
        function(err) {
            if (err) {
               console.log(err);
            } else {
                console.log('connected to mongoDb - cloud');
                app.listen(port, function() {
                    console.log("Listening on " + port);
                });
            }
        }
    );
});
