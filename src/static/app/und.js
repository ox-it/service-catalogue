define(['underscore', 'jquery'], function(_, $) {
	return {
		load: function (name, req, onload, config) {
	        var url = req.toUrl(name + '.underscore');
	        
	        $.ajax(url, {
	        	type: 'GET',
	        	dataType: 'text',
	        	success: function(data) {
	        		var template = _.template(data);
	        		onload(template);
	        	}
	        });
		}
	};
});