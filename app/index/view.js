define(['backbone', 'jquery', 'underscore',
        'model', 'templates', 'services-filter'],
        function(Backbone, $, _, model, templates, ServicesFilter) {
	var IndexView = Backbone.View.extend({
		initialize: function() {
			this.$el.html(templates.index({
				categories: model.categories,
				services: model.services,
				templates: templates,
				base: model.base
			}));

			this.$serviceSearch = this.$el.find('#service-search');
			this.$serviceSearchClear = this.$el.find('#service-search-clear');

			this.servicesFilter = new ServicesFilter(
				this.$el.find(".filterable-service-list"),
				this.$el.find(".filterable-service-list li")
			);

		},
		render: function() {
			Backbone.trigger('domchange:title', "Service Catalogue");
			Backbone.trigger('domchange:breadcrumb', []);
			Backbone.trigger('domchange:status', '200');

			this.servicesFilter.watchInput(this.$serviceSearch, this.$serviceSearchClear);
			this.$serviceSearch.focus();
		}
	});

	return IndexView;
});
