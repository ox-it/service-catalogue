define(['backbone', 'jquery', 'underscore',
        'model', 'und!index/templates/index.html'],
        function(Backbone, $, _,
        		model, indexTemplate) {
	var IndexView = Backbone.View.extend({
		template: indexTemplate,
		render: function() {
			Backbone.trigger('domchange:title', "Service Catalogue");
			Backbone.trigger('domchange:status', '200');

			this.$el.html(this.template({
				categories: model.categories,
				services: model.services
			}));

			this.$serviceSearch = this.$el.find('#service-search');
			this.$serviceSearch.on('input', _.bind(this.filterServices, this));
			this.$serviceSearchClear = this.$el.find('#service-search-clear');
			this.$serviceSearchClear.on('click', _.bind(function(ev) {
				this.$serviceSearch.val("").focus();
				this.filterServices();
				ev.preventDefault();
			}, this));
		},
		currentFilterCallback: null,
		filterServices: function() {
			var val = $.trim(this.$serviceSearch.val());
			if (val.length == 0) {
				this.sortServices(null);
			} else {
				var callback = _.bind(function(data) {
					if (this.currentFilterCallback != callback)
						return;
					var slugs = {}, i = 0;
					_.each(data.hits.hits, function(e) {
						slugs[e._source.notation.service] = i++;
					});
					this.sortServices(slugs);
				}, this);
				this.currentFilterCallback = callback;
				$.get('https://data.ox.ac.uk/search/', {
					format: 'json',
					type: 'service',
					'filter.organizationPart.uri': 'http://oxpoints.oucs.ox.ac.uk/id/31337175',
					page_size: '3000',
					q: val + '*'
				}, callback, 'json');
			}
		},
		sortServices: function(slugs) {
			var $ul = $('#services ul');
			var lis = $ul.find('li').get();
			lis = _.sortBy(lis, function(li) {
				return slugs ? slugs[li.getAttribute('data-slug')] : li.getAttribute('data-label').toLowerCase();
			});
			_.each(lis, function(li) {
				$(li).toggle(!slugs || (li.getAttribute('data-slug') in slugs));
				$ul.append(li);
			});
		}
	});

	return IndexView;
});
