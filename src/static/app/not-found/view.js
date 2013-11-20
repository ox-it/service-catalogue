define(['backbone', 'und!not-found/templates/not-found.html'], function(Backbone, notFoundTemplate) {
	var NotFoundView = Backbone.View.extend({
		template: notFoundTemplate,
		render: function() {
		    Backbone.trigger('domchange:title', "Not Found");
		    Backbone.trigger('domchange:status', '404');

			this.$el.html(this.template());
		}
	});
	
	return NotFoundView;
});