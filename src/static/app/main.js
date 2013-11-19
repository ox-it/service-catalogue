define(['require', "jquery", "backbone",
        "model",
        "index/view", "category/view"],
  function(require, $, Backbone,
		   model,
		   IndexView, CategoryView) {
    
    if (!window.console) console = {log: function() {}};
    
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "index",
			"category/:slug": "category"
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
		currentView.render();
		content.empty().append(currentView.el);
	};
	
	var indexView = null;
	app_router.on('route:index', function() {
		if (!indexView)
			indexView = new IndexView();
		renderView(indexView);
	});

	var categoryViews = {};
	app_router.on('route:category', function(slug) {
		if (!categoryViews[slug])
			categoryViews[slug] = new CategoryView({
				model: model.categories.get(slug)
			});
		renderView(categoryViews[slug]);
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
	
	$(document).on('click', "a[href^='/']", function(event) {
		var href = $(event.currentTarget).attr('href');
		try{
			app_router.navigate(href, {trigger: true});
		} catch (e) {
			console.log(e);
		} finally {
			event.preventDefault();
			return false;
		}
	});
	
	Backbone.history.start({
		pushState: true,
		root: "/"
	});
});
