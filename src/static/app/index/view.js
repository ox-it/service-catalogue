define(['backbone', 'und!index/templates/index'], function(Backbone, indexTemplate) {
	var IndexView = Backbone.View.extend({
		template: indexTemplate,
		render: function() {
		    Backbone.trigger('domchange:title', null);

			this.$el.html(this.template());
		}
	});
	
	return IndexView;
});