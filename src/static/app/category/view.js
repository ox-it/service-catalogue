define(['backbone', 'model', 'und!category/templates/category.html'], function(Backbone, model, categoryTemplate) {
	var CategoryView = Backbone.View.extend({
		template: categoryTemplate,
		render: function() {
		    Backbone.trigger('domchange:title', null);
		    Backbone.trigger('domchange:status', '200');
			this.$el.html(this.template({
				categories: model.categories,
				category: this.model,
				slug: this.model.get("slug")
			}));
		}
	});
	
	return CategoryView;
});
