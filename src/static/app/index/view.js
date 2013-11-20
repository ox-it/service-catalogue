define(['backbone', 'jquery', 'model', 'und!index/templates/index.html'], function(Backbone, $, model, indexTemplate) {
	var IndexView = Backbone.View.extend({
		template: indexTemplate,
		render: function() {
			Backbone.trigger('domchange:title', "Service Catalogue");
			Backbone.trigger('domchange:status', '200');

			this.$el.html(this.template({
				categories: model.categories,
				services: model.services
			}));

			this.$el.find('#service-search').on('keyup', function(ev) {
				var val = $.trim($(this).val());
				if (val.length == 0) {
					$(document).attr('title', 'n');
				} else {
					$.get('https://data.ox.ac.uk/search/', {
						format: 'json',
						type: 'service',
						'filter.organizationPart.uri': 'http://oxpoints.oucs.ox.ac.uk/id/31337175',
						page_size: '3000',
						q: val + '*'
					}, function(data) {
						$(document).attr('title', data.hits.hits.length);

					}, 'json');
				}
			})
		}
	});

	return IndexView;
});
