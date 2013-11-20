define(['backbone', 'jquery', 'underscore', 'model',
        'und!templates/status.html'], function(Backbone, $, _, model, statusTemplate) {
	var status = {
		statuses: {
			'Up': {
				label: 'Up',
				fontAwesome: 'check-square',
				color: '#015f05'
			},
			'Down': {
				label: 'Down',
				fontAwesome: 'bug',
				color: '#953b39'
			},
			'Partial': {
				label: 'Partial',
				fontAwesome: 'minus-square',
				color: '#f89406'
			}
		},
		registerForStatusUpdates: function() {
			model.services.forEach(function(service) {
				if (!service.get('statusId'))
					return;
				service.on('change:status', function() {
					var newServiceStatusDisplay = statusTemplate({
						status: status,
						service: service
					});
					$('.service-status-display[data-service="' + service.get('slug') + '"]').replaceWith(newServiceStatusDisplay);
				});
			});
		},
		updateStatus: function() {
			$.get('http://status.ox.ac.uk/api/services.json', function(data) {
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