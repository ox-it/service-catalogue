define(['backbone', 'model', 'status', 'templates'],
        function(Backbone, model, status, templates) {
	var CategoryView = Backbone.View.extend({
		render: function() {
			Backbone.trigger('domchange:title', this.model.get('label'));
			Backbone.trigger('domchange:breadcrumb', [{href: 'category/' + this.model.get('slug'), label: this.model.get('label')}]);
		    Backbone.trigger('domchange:status', '200');
			this.$el.html(templates.category({
				categories: model.categories,
				category: this.model,
				slug: this.model.get("slug"),
				status: status,
				templates: templates,
				base: model.base
			}));
		}
	});
	
	return CategoryView;
});
