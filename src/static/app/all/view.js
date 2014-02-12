define(['backbone', 'jquery', 'underscore',
        'model', 'templates', 'services-filter'],
        function(Backbone, $, _,
        		model, templates, ServicesFilter) {
	var AllView = Backbone.View.extend({
		initialize: function() {
			this.$el.html(templates.all({
				base: model.base,
				services: model.services,
				templates: templates,
			}));

			this.$serviceSearch = this.$el.find('#service-search');
			this.$serviceSearchClear = this.$el.find('#service-search-clear');

			this.servicesFilter = new ServicesFilter(
				this.$el.find(".filterable-service-list"),
				this.$el.find(".filterable-service-list li"),
				_.bind(function(query) {
					if (query) {
						Backbone.trigger('domchange:title', "Search services: " + query);
						Backbone.trigger('domchange:breadcrumb', [{href: 'all', label: 'All Services'}, {href: 'all?q=' + query, label: "Filtered by: " + query}]);
						this.$el.find('h1 span').text("Search services: " + query);
						if (window.history)
							window.history.replaceState({}, "", "?q=" + query);
					} else {
						Backbone.trigger('domchange:title', "All services");
						Backbone.trigger('domchange:breadcrumb', [{href: 'all', label: 'All Services'}]);
						this.$el.find('h1 span').text("All services");
						if (window.history)
							window.history.replaceState({}, "", window.location.pathname);
					}
				}, this)
			);
		},
		render: function() {
			// Setting title done with our filter callback, above
			Backbone.trigger('domchange:status', '200');

			this.$serviceSearch.val(this.getQueryParameter('q'));
			this.servicesFilter.update(this.$serviceSearch.val())
			this.servicesFilter.watchInput(this.$serviceSearch, this.$serviceSearchClear);
			this.$serviceSearch.focus();
			this.setCaretPosition(this.$serviceSearch.get(0), this.$serviceSearch.val().length);
		},
		getQueryParameter: function(name) {
			if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(window.location.search))
				return decodeURIComponent(name[1]);
		},
		setCaretPosition: function(el, caretPos) {
			// http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
			if (el.createTextRange) {
				var range = el.createTextRange();
				range.move('character', caretPos);
				range.select();
			} else if (el.selectionStart !== undefined) {
				el.setSelectionRange(caretPos, caretPos);
			}
		}
	});
	return AllView;
});