define(['backbone', 'underscore'], function(Backbone, _) {
	var Category = Backbone.Model.extend({
		idAttribute: "slug",
		getServices: function() {
			var uri = this.get("uri");
			return services.filter(function(service) {
				return _.contains(service.get("subject"), uri); 
			});
		}
	});

	var Service = Backbone.Model.extend({
		idAttribute: "slug"
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
					}) : [],
					uri: e._source.uri
				};
			});
		}
	});
	var categories = new Categories();
	
	var Services = Backbone.Collection.extend({
		model: Service,
		url: "https://data.ox.ac.uk/search/?format=json&q=*&type=service&filter.organizationPart.uri=http://oxpoints.oucs.ox.ac.uk/id/31337175&page_size=3000",
		parse: function(response) {
			return _.sortBy(_.map(response.hits.hits, function(e) {
				return {
					label: e._source.label,
					slug: e._source.notation.service,
					uri: e._source.uri,
					description: e._source.description,
					description_html: e._source.descriptionHTML,
					subject: _.map(e._source.subject, function(e) { return e.uri; }),
					twitter: (e._source.account || {}).twitter,
					statusId: (e._source.account || {}).status,
					homepage: (e._source.homepage || {}).uri,
					weblog: (e._source.weblog || {}).uri,
					serviceInformation: (e._source.serviceInformation || {}).uri
				};
			}), function(e) {
				return e.label.toLowerCase();
			});
		}
	});
	var services = new Services();
	
	return {
		Category: Category,
		categories: categories,
		Service: Service,
		services: services
	};
})
