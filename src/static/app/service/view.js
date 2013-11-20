define(['backbone', 'jquery', 'underscore',
        'model', 'und!templates/service.html'],
        function(Backbone, $, _,
        		model, serviceTemplate) {
	var ServiceView = Backbone.View.extend({
		template: serviceTemplate,
		render: function() {
			this.$el.html(this.template({
				service: this.model
			}));
		}
	});
	return ServiceView;
});