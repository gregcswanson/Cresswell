var jayCounter = 1;

JayProvider = function(){};
JayProvider.prototype.dummyData = [];

JayProvider.prototype.findAll = function(callback) {
  callback( null, this.dummyData );
};

JayProvider.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

JayProvider.prototype.save = function(jays, callback) {
  var jay = null;

  if( typeof(jays.length)=="undefined")
    jays = [jays];

  for( var i =0;i< jays.length;i++ ) {
    jay = jays[i];
    jay._id = jayCounter++;
    jay.created_at = new Date();

    if( jay.comments === undefined )
      jay.comments = [];

    for(var j =0;j< jay.comments.length; j++) {
      jay.comments[j].created_at = new Date();
    }
    this.dummyData[this.dummyData.length]= jay;
  }
  callback(null, jays);
};

/* Lets bootstrap with dummy data */
new JayProvider().save([
  {title: 'Post one', body: 'Body one', comments:[{author:'Bob', comment:'I love it'}, {author:'Dave', comment:'This is rubbish!'}]},
  {title: 'Post two', body: 'Body two'},
  {title: 'Post three', body: 'Body three'}
], function(error, articles){});

exports.JayProvider = JayProvider;