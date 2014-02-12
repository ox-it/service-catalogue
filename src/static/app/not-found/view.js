define(['backbone', 'templates', 'model'], function(Backbone, templates, model) {
	var NotFoundView = Backbone.View.extend({
		render: function() {
		    Backbone.trigger('domchange:title', "Not Found");
			Backbone.trigger('domchange:breadcrumb', [{href: window.location.pathname.substring(model.base.length), label: 'Not found'}]);
		    Backbone.trigger('domchange:status', '404');

			this.$el.html(templates.notFound({
				base: model.base
			}));
		}
	});
	
	return NotFoundView;
});
