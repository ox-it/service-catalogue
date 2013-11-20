define(['backbone', 'model', 'und!index/templates/index.html'], function(Backbone, model, indexTemplate) {
	var IndexView = Backbone.View.extend({
		template: indexTemplate,
		render: function() {
			Backbone.trigger('domchange:title', "Service Catalogue");
			Backbone.trigger('domchange:status', '200');
		    
			this.$el.html(this.template({
				categories: model.categories,
				services: model.services
			}));
		}
	});
	
	return IndexView;
});
