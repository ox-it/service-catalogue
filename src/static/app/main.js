define(['require', "jquery", "backbone",
        "index/view"],
  function(require, $, Backbone,
		   IndexView) {
    
    if (!window.console) console = {log: function() {}};
    
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "index"
		}
	});

	var app_router = new AppRouter();
	
	var content = $('#content');
	
	var currentView = null;
	var renderView = function(view, options) {
		if (view == currentView)
			return;
		else if (currentView)
			currentView.remove();
		
		currentView = view;
		content.empty().append(currentView.el);
		currentView.render();

		var currentHash = window.location.hash.substr(1).split('/');
		$('a.highlight-nav').each(function() {
			var hash = this.hash.substr(1).split('/');
			if (!($(this).closest('.navbar').length || hash.length == currentHash.length))
				return;
			for (var i=0; i<hash.length; i++) {
				if (hash[i] != currentHash[i]) {
					$(this).parent().removeClass('active');
					return;
				}
			}
			$(this).parent().addClass('active');
		});
	};
	
	var indexView = null;
	app_router.on('route:index', function() {
		if (!indexView)
			indexView = new IndexView();
		renderView(indexView);
	});

	Backbone.on('domchange:title', function(title) {
	    if (!title)
	        $(document).attr('title', 'IT Services');
	    else
	        $(document).attr('title', title + ' — IT Services');
	}, this);
	Backbone.on('app:navigate', function() {
		app_router.navigate.apply(app_router, arguments);
	});
	
	Backbone.history.start();
});
