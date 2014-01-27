define(['backbone', 'templates'], function(Backbone, templates) {
	var NotFoundView = Backbone.View.extend({
		render: function() {
		    Backbone.trigger('domchange:title', "Not Found");
		    Backbone.trigger('domchange:status', '404');

			this.$el.html(templates.notFound());
		}
	});
	
	return NotFoundView;
});
