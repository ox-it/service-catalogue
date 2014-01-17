define(['backbone', 'jquery', 'underscore',
        'model', 'templates'],
        function(Backbone, $, _,
        		model, templates) {
	var ServiceView = Backbone.View.extend({
		render: function() {
		        Backbone.trigger('domchange:title', this.model.get('label'));
		        Backbone.trigger('domchange:status', '200');
			this.$el.html(templates.service({
				service: this.model,
				categories: model.categories,
				templates: templates,
				base: model.base
			}));
		}
	});
	return ServiceView;
});
