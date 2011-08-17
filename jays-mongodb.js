require.paths.unshift('./mongoose/lib');

JayProvider = function(host, port) {
    this.db=require('mongoose');
    this.db.connect('mongodb://test:test123@flame.mongohq.com:27106/cloud');
    console.log(this.db.connection.host); 
    console.log(this.db.connection.port);
    this.Schema = this.db.Schema; 
    this.ObjectID = this.Schema.ObjectID;

    // Create the models
    this.jaysSchema = new this.Schema({
        title   : String
    });
    
    this.db.model('jays', this.jaysSchema);
    this.myJays = this.db.model('jays');
};

JayProvider.prototype.findAll = function(callback) {
    this.myJays.find({}, function(error, jays_collection){
        if( error ) callback(error);
        else callback(null, jays_collection);
    });
};

JayProvider.prototype.findById = function(id, callback) {
    this.myJays.findById(id, function (err, item) {
        if (!err) {
            callback(null, item);
        }
    });
};

JayProvider.prototype.save = function(jay, callback) {
    var instance = new this.myJays();
    instance.title = jay.title;
    instance.save(function (err) {
        if(err) console.log(err);
        callback(null, jay);
    });
};


exports.JayProvider = JayProvider;