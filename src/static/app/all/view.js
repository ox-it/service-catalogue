define(['backbone', 'jquery', 'underscore',
        'model', 'templates'],
        function(Backbone, $, _,
        		model, templates) {
	var AllView = Backbone.View.extend({
		initialize: function() {
			this.$el.html(templates.all({
				base: model.base,
				services: model.services,
				templates: templates,
			}));
			
		},
		render: function() {
			Backbone.trigger('domchange:title', "All Services");
			Backbone.trigger('domchange:status', '200');
			
		}
	});
	return AllView;
});