// Data Access


// View Model
function AppViewModel() {
      var self = this;
      self.message = ko.observable('N/A');
      self.openPagesEnabled = ko.observable(true);
      
      self.openPage1 = function () {
          location.hash = "/";
      }
      
      self.openPage2 = function () {
      	location.hash = "/page2/3";
      }
      
      self.showPage = function(pageInfo, complete) {
      	var name = pageInfo.page;
    	$('#pages > div').hide('');
      	if($('#pages > #page-' + name).length == 0)
      	{
      		$('#loading').show();
      		$('#pages').append('<div id="page-' + name +'"></div>');
      		self.message('loadeing ' + name );
      		$('#page-' + name ).load('/' + name + ' #' + name, function () {
      			self.message('loaded ' + name );
      			$.getScript('/javascripts/viewmodels/' + name + 'ViewModel.js', function(){
      				$('#loading').hide();
      				amplify.publish("refresh-page-" + name, pageInfo.id);
      				complete();
      			});
      			
      		});
      	} else {
      		$('#page-' + name ).show('');
      		self.message('reloaded ' + name );
      		amplify.publish("refresh-page-" + name, pageInfo.id);
      		complete();
      	}
      }
      
    amplify.subscribe("navigate-to-page", function(pageInfo) {
		self.openPagesEnabled(false);
     	self.showPage(pageInfo, function () {
      		self.openPagesEnabled(true);
      	});
	});
};
    
ko.applyBindings(new AppViewModel(), document.getElementById('app'));

// Jquery

$(function(){

	var app = $.sammy('#pages', function () {
		this.get('#/', function(context) {
        	amplify.publish("navigate-to-page", { page: "Page1", id: "0" });
      	});  
      	
      	this.get('#/page2/:id', function(context) {
        	amplify.publish("navigate-to-page", { page: "Page2", id: this.params['id'] });
      	});  
	});
	
	$(function() {
    	app.run('#/');
    });
});