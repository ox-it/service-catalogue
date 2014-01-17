define(['backbone', 'underscore', 'jquery', 'cutter'], function(Backbone, _, $, Cutter) {
	var base = (document.location.hostname == 'ox-it.github.io') ? '/service-catalogue/src/' : $('.services-config').attr('data-site-root');

	var Category = Backbone.Model.extend({
		idAttribute: "slug",
		getServices: function() {
			var uri = this.get("uri");
			return services.filter(function(service) {
				return _.contains(service.get("subject"), uri); 
			});
		},
		getFeaturedServices: function() {
			return _.map(this.get('featured'), function(uri) { return services.findWhere({"uri": uri}); });
		}
	});

	var Service = Backbone.Model.extend({
		idAttribute: "slug"
	});

	var Categories = Backbone.Collection.extend({
		model: Category,
		url: $('.services-config').attr('data-categories-url') || 'https://data.ox.ac.uk/search/?format=json&q=scheme.uri:%22https://id.it.ox.ac.uk/service-category%22&page_size=20',
		parse: function(response) {
			return _.sortBy(_.map(response.hits.hits, function(e) {
				return {
					label: e._source.label,
					fontAwesome: e._source.fontAwesome,
					slug: e._source.notation.serviceCategory,
					teaser: e._source.teaser,
					definition: e._source.definition,
					broader: e._source.broader[0].uri,
					sortKey: e._source.sortKey,
					featured: e._source.featured ? _.map(e._source.featured, function(e) {
						return e.uri;
					}) : [],
					url: base + 'category/' + e._source.notation.serviceCategory,
					uri: e._source.uri
				};
			}), function(e) {
				return e.sortKey;
			});
		}
	});
	var categories = new Categories();
	
	var Services = Backbone.Collection.extend({
		model: Service,
		url: $('.services-config').attr('data-services-url') || "https://data.ox.ac.uk/search/?format=json&q=*&type=service&filter.organizationPart.uri=http://oxpoints.oucs.ox.ac.uk/id/31337175&page_size=3000",
		parse: function(response) {
			return _.sortBy(_.map(response.hits.hits, function(e) {
				var descriptionHTML = e._source.descriptionHTML || ("<div>" + _.escape(e._source.description || '') + "</div>");
				var teaser = "<div>" + _.escape(e._source.teaser) + "</div>";
				if (!teaser && descriptionHTML) {
					var $teaser = $(descriptionHTML);
					var cutter = new Cutter();
					cutter.createViewMore = function() { this.oViewMore = document.createTextNode(''); };
					cutter.applyTo($teaser.get(0)).setTarget($teaser.get(0)).setWords(20);
					cutter.init();
					teaser = $teaser.html();
				}
				var service = {
					label: e._source.label,
					shortLabel: e._source.shortLabel,
					slug: e._source.notation.service,
					uri: e._source.uri,
					url: base + "service/" + e._source.notation.service,
					description: e._source.description,
					description_html: descriptionHTML,
					catalogueReady: e._source.catalogueReady,
					subject: _.map(e._source.subject, function(e) { return e.uri; }),
					twitter: (e._source.account || {}).twitter,
					statusId: (e._source.account || {}).status,
					homepage: (e._source.homepage || {}).uri,
					weblog: (e._source.weblog || {}).uri,
					teaser: teaser,
					serviceTeam: e._source.serviceTeam || {},
					serviceOwner: e._source.serviceOwner || {},
					serviceBusinessOwner: e._source.serviceBusinessOwner || {},
					serviceInformation: (e._source.serviceInformation || {}).uri,
					serviceLevelDefinition: (e._source.serviceLevelDefinition || {}).uri,
					contactForm: (e._source.contact || {}).contactForm,
					contactEmail: (e._source.contact || {}).email,
					contactVoice: (e._source.contact || {}).voice,
					contactVoiceExtension: (e._source.contact || {}).voiceExtension
				};
				if (!service.catalogueReady)
					service.url = service.serviceInformation || service.homepage || service.serviceLevelDefinition;
				return service;
			}), function(e) {
				return e.label.toLowerCase();
			});
		}
	});
	var services = new Services();
	
	return {
		base: base,
		Category: Category,
		categories: categories,
		Service: Service,
		services: services
	};
})
