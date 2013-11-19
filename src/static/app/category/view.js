define(['backbone', 'model', 'und!category/templates/category.html'], function(Backbone, model, categoryTemplate) {
	var CategoryView = Backbone.View.extend({
		template: categoryTemplate,
		render: function() {
		    Backbone.trigger('domchange:title', null);
		    model.categories.fetch().complete(_.bind(function() {
				this.$el.html(this.template({
					categories: model.categories,
					category: this.model,
					slug: this.model.get("slug")
				}));
		    }, this));

		}
	});
	
	return CategoryView;
});