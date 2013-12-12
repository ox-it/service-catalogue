define(['backbone', 'model', 'status',
        'tpl!templates/category',
        'tpl!templates/status'],
        function(Backbone, model, status, categoryTemplate, statusTemplate) {
	var CategoryView = Backbone.View.extend({
		template: categoryTemplate,
		render: function() {
		    Backbone.trigger('domchange:title', this.model.get('label'));
		    Backbone.trigger('domchange:status', '200');
			this.$el.html(this.template({
				categories: model.categories,
				category: this.model,
				slug: this.model.get("slug"),
				status: status,
				statusTemplate: statusTemplate
			}));
		}
	});
	
	return CategoryView;
});
