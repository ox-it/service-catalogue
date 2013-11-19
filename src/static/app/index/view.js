define(['backbone', 'model', 'und!index/templates/index.html'], function(Backbone, model, indexTemplate) {
	var IndexView = Backbone.View.extend({
		template: indexTemplate,
		render: function() {
		    Backbone.trigger('domchange:title', null);
		    
		    model.categories.fetch().complete(_.bind(function() {
				this.$el.html(this.template({
					categories: model.categories
				}));
		    }, this));

		}
	});
	
	return IndexView;
});