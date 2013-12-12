define(['backbone', 'jquery', 'underscore',
        'model', 'tpl!templates/service'],
        function(Backbone, $, _,
        		model, serviceTemplate) {
	var ServiceView = Backbone.View.extend({
		template: serviceTemplate,
		render: function() {
		        Backbone.trigger('domchange:title', this.model.get('label'));
		        Backbone.trigger('domchange:status', '200');
			this.$el.html(this.template({
				service: this.model
			}));
		}
	});
	return ServiceView;
});
