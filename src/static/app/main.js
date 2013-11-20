define(['require', "jquery", "backbone",
        "model",
        "index/view", "category/view", "not-found/view"],
  function(require, $, Backbone,
		   model,
		   IndexView, CategoryView, NotFoundView) {
    
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
	
	var notFoundView = new NotFoundView();
	
	var indexView = null;
	app_router.on('route:index', function() {
		if (!indexView)
			indexView = new IndexView();
		renderView(indexView);
	});

	var categoryViews = {};
	app_router.on('route:category', function(slug) {
		var model = model.categories.get(slug);
		if (!model) {
			renderView(notFoundView);
		} else {
			if (!categoryViews[slug])
				categoryViews[slug] = new CategoryView({
					model: model
				});
			renderView(categoryViews[slug]);
		}
	});

	Backbone.on('domchange:title', function(title) {
	    if (!title)
	        $(document).attr('title', 'IT Services');
	    else
	        $(document).attr('title', title + ' — IT Services');
	}, this);
	Backbone.on('domchange:status', function(status) {
		$("meta[name='prerender-status-code']").attr('content', status);
	});

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
	

    model.categories.fetch().complete(_.bind(function() {
        model.services.fetch().complete(_.bind(function() {
	Backbone.history.start({
		pushState: true,
		root: "/service-catalogue/src/"
	});
        }, this));
    }, this));
});
