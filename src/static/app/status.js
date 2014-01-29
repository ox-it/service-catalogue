define(['backbone', 'jquery', 'underscore', 'model',
        'templates'], function(Backbone, $, _, model, templates) {
	var status = {
		statuses: {
			'Up': {
				label: 'Up',
				fontAwesome: 'arrow-circle-o-up',
				color: '#015f05'
			},
			'Down': {
				label: 'Down',
				fontAwesome: 'arrow-circle-o-down',
				color: '#953b39'
			},
			'Partial': {
				label: 'Partial',
				fontAwesome: 'circle-o',
				color: '#f89406'
			}
		},
		addStatusSubscriptions: function($el) {
			$el.find('.service-status-display').each(function() {
				var service = model.services.get(this.getAttribute('data-service'));
				if (!service) return;
				service.on('change:status', _.bind(function() {
					var newStatusInner = templates.statusInner({
						status: status,
						service: service
					});
					this.innerHTML = newStatusInner;
				}, this));
			});
		},
		updateStatus: function() {
			$.get(model.statusURL, function(data) {
				var statuses = {};
				_.each(data.groups, function(group) {
					statuses[group.id] = group.status_name;
					_.each(group.services, function(service) {
						statuses[service.id] = service.status_name;
					});
				});
				model.services.forEach(function(service) {
					var statusId = service.get("statusId");
					if (statusId in statuses)
						service.set("status", statuses[statusId]); 
				});
			}, 'json');
		}
	};
	return status;
});
