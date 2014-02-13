define(['backbone', 'jquery', 'underscore',
        'model', 'templates', 'status'],
        function(Backbone, $, _,
        		model, templates, status) {
	var ServiceView = Backbone.View.extend({
		initialize: function() {
			this.$el.html(templates.service({
				service: this.model,
				categories: model.categories,
				templates: templates,
				base: model.base,
				status: status
			}));
			status.addStatusSubscriptions(this.$el);
		},
		render: function() {
	        Backbone.trigger('domchange:title', this.model.get('label'));
			Backbone.trigger('domchange:breadcrumb', [{href: this.model.get('url'), label: this.model.get('label')}]);
	        Backbone.trigger('domchange:status', '200');
		}
	});
	return ServiceView;
});
