var wallPostCounter = 1;

WallPostProvider = function(){};
WallPostProvider.prototype.dummyData = [];

WallPostProvider.prototype.findAll = function(callback) {
  callback( null, this.dummyData );
};

WallPostProvider.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

WallPostProvider.prototype.save = function(wallPosts, callback) {
  var wallPost = null;

    // convert to an array of posts to process if a single all post is submitted
  if( typeof(wallPosts.length)=="undefined")
    wallPosts = [wallPosts];

  for( var i =0;i< wallPosts.length;i++ ) {
    wallPost = wallPosts[i];
    wallPost._id = wallPostCounter++;
    wallPost.created_at = new Date();
    this.dummyData[this.dummyData.length]= wallPost;
  }
  callback(null, wallPosts);
};

/* Lets bootstrap with dummy data */
new WallPostProvider().save([
  {title: 'First Post', body: 'Exect everything here to be deleted'}
], function(error, articles){});

exports.WallPostProvider = WallPostProvider;