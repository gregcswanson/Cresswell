require.paths.unshift('./mongoose/lib');
var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test123@flame.mongohq.com:27106/cloud');
//console.log(mongoose.connection.host); 
//console.log(mongoose.connection.port);

var Schema = mongoose.Schema, ObjectID = Schema.ObjectID;

// Create the models
var jaysSchema = new Schema({
    title   : String
});

mongoose.model('jays', jaysSchema);
var myJays = mongoose.model('jays');
 
// public functions
function getJay(id, foundJay){
    console.log("getJay: Connecting to mongoHQ");    
    myJays.find({}, function(err, docs){
  //      console.log("read data from mongoHQ");
        var jay = { title: 'default' };
        docs.forEach(function(doc){
            jay = doc;
    //        console.log('Document found:' + doc.title);
        });
        foundJay(jay); 
    }); 
}

function getJays(foundJays){
    cnosole.log("getJays: Connecting to mongoHQ");    
    myJays.find({}, function(err, jays){
      //  console.log("read data from mongoHQ");
        foundJays(jays);
    });
}

exports.getJay = getJay;
exports.getJays = getJays;