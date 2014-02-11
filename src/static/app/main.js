define(["jquery", "backbone",
        "model", "status",
        "index/view", "all/view", "category/view", "service/view", "not-found/view"],
  function($, Backbone,
		   model, status,
		   IndexView, AllView, CategoryView, ServiceView, NotFoundView) {
    
	if (!window.console) console = {log: function() {}};

    
	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'index',
			'all': 'all',
			'all?*p': 'all',
			'category/:slug': 'category',
			'service/:slug': 'service',
			'*p': 'not-found'
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
	};
	
	var notFoundView = new NotFoundView();
	app_router.on('route:not-found', function() {
		renderView(notFoundView);
	});
	
	var indexView = null;
	app_router.on('route:index', function() {
		if (!indexView)
			indexView = new IndexView();
		renderView(indexView);
	});

	var allView = null;
	app_router.on('route:all', function() {
		if (!allView)
			allView = new AllView();
		renderView(allView);
	})

	var categoryViews = {};
	app_router.on('route:category', function(slug) {
		var category = model.categories.get(slug);
		if (!category) {
			renderView(notFoundView);
		} else {
			if (!categoryViews[slug])
				categoryViews[slug] = new CategoryView({
					model: category
				});
			renderView(categoryViews[slug]);
		}
	});

	var serviceViews = {};
	app_router.on('route:service', function(slug) {
		var service = model.services.get(slug);
		if (!service) {
			renderView(notFoundView);
		} else {
			if (!serviceViews[slug])
				serviceViews[slug] = new ServiceView({
					model: service
				});
			renderView(serviceViews[slug]);
		}
	});

	Backbone.on('domchange:title', function(title) {
	    if (!title)
	        $(document).attr('title', 'IT Services');
	    else
	        $(document).attr('title', title + ' — IT Services');
	}, this);
	Backbone.on('domchange:status', function(status) {
		var statusMeta = $("meta[name='prerender-status-code']");
		if (!statusMeta.length)
			statusMeta = $('<meta name="prerender-status-code"></meta>').appendTo($('head'));
		statusMeta.attr('content', status);
	});

	// Disable JS-based navigation completely if the browser doesn't support it.
	if (!!(window.history && history.pushState)) {
		Backbone.on('app:navigate', function() {
			app_router.navigate.apply(app_router, arguments);
		});

		// Intercept links
		$(document).on('click', "a[href^='" + model.base + "']", function(event) {
			var href = $(event.currentTarget).attr('href');
			try {
				app_router.navigate(href.substr(model.base.length), {trigger: true});
			} catch (e) {
				console.log(e);
				throw e;
			}
			event.preventDefault();
			return false;
		});

		// Intercept forms
		$(document).on('submit', "form[action^='" + model.base + "']", function(event) {
			// Don't intercept POST forms.
			if (event.target.method.toLowerCase() != "get") return;
			try {
				var form = $(event.target);
				var url = form.attr('action').substr(model.base.length);
				url += "?" + form.serialize();
				app_router.navigate(url, {trigger: true});
			} catch (e) {
				console.log(e);
				throw e;
			}
			event.preventDefault();
			console.log(event);
			return false;
		});
	}

	model.categories.fetch().complete(_.bind(function() {
		model.services.fetch().complete(_.bind(function() {
			Backbone.history.start({
				pushState: true,
				hashChange: false,
				root: model.base
			});
			status.updateStatus();
			setInterval(status.updateStatus, 60000);
		}, this));
	}, this));
});
