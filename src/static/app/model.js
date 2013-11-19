define(['backbone', 'underscore'], function(Backbone, _) {
	var Category = Backbone.Model.extend({
		idAttribute: "slug"
	});

	var Service = Backbone.Model.extend({
		idAttribute: "uri"
	});

	var Categories = Backbone.Collection.extend({
		model: Category,
		url: "https://data.ox.ac.uk/search/?format=json&q=scheme.uri:%22https://id.it.ox.ac.uk/service-category%22",
		parse: function(response) {
			return _.map(response.hits.hits, function(e) {
				return {
					label: e._source.label,
					fontAwesome: e._source.fontAwesome,
					slug: e._source.notation.serviceCategory,
					featured: e._source.featured ? _.map(e._source.featured, function(e) {
						return e.uri;
					}) : []
				};
			});
		}
	});
	
	var Services = Backbone.Collection.extend({
		model: Service,
		url: "https://data.ox.ac.uk/search/?format=json&q=*&type=service&filter.organizationPart.uri=http://oxpoints.oucs.ox.ac.uk/id/31337175&page_size=3000",
		parse: function(response) {
			return _.map(response.hits.hits, function(e) {
				return {
					label: e._source.label,
					slug: e._source.notation ? e._source.notation.service : 'x' 
				};
			});
		}
	});
	
	return {
		Category: Category,
		categories: new Categories(),
		Service: Service,
		services: new Services()
	};
})
