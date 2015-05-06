define(['model'], function(model) {
	var ServicesFilter = function($container, $items, callbackBefore, callbackAfter) {
		this.$container = $container;
		this.$items = $items;
		this.callbackBefore = callbackBefore;
		this.callbackAfter = callbackAfter;
		this.searchCallback = null;
	};

	ServicesFilter.prototype = {
		update: function(query) {
			if (this.callbackBefore) this.callbackBefore(query);

			if (!query || query.length == 0) {
				this.searchCallback = null;
				this.sortServices(null, null);
			} else {
				var callback = _.bind(function(data) {
					if (this.searchCallback != callback)
						return;
					var slugs = {}, i = 0;
					_.each(data.hits.hits, function(e) {
						slugs[e._source.notation.service] = i++;
					});
					this.searchCallback = null;
					this.sortServices(query, slugs);
				}, this);
				this.searchCallback = callback;
				$.get(model.searchEndpoint, {
					format: 'json',
					type: 'service',
					'filter.organizationPart.uri': 'http://oxpoints.oucs.ox.ac.uk/id/31337175',
					page_size: '100',
					q: query + '*'
				}, callback, 'json');
			}
		},
		sortServices: function(query, slugs) {
			var lis = this.$items.get();
			var $container = this.$container;
			lis = _.sortBy(lis, function(li) {
				return slugs ? slugs[li.getAttribute('data-slug')] : li.getAttribute('data-label').toLowerCase();
			});
			_.each(lis, function(li) {
				$(li).toggle(!slugs || (li.getAttribute('data-slug') in slugs));
				$container.append(li);
			});
			if (this.callbackAfter) this.callbackAfter(query);
		},
		watchInput: function($input, $clear) {
			// Watches a HTMLInputElement for changes and kicks off a filter
			// when its value changes. $clear can be a button that will wipe
			// out the HTMLInputElement's value and reset the filter.
			if ("oninput" in $input.get(0)) { // "Modern" browsers
				$input.on('input', _.bind(this.inputEvent, this));
				// IE9 doesn't fire input events for backspace and delete, so
				// we'll catch them here. IE10 does fire them, so IE9 is the
				// only weird browser we care about.
				if (window.navigator.userAgent.match(/MSIE 9\.0/)) {
					$input.on('keyup', _.bind(function(ev) {
						if (ev.key == "Backspace" || ev.key == "Del")
							this.inputEvent(ev);
					}, this));
				}
			} else if ("onpropertychange" in $input.get(0)) { // Older IEs
				$input.on("propertychange", _.bind(function(ev) {
					if ((ev.originalEvent || ev).propertyName == 'value')
						this.inputEvent(ev);
				}, this));
			} else {
				console.log("Can't filter services as we type");
			}
			if ($clear) {
				$clear.on('click', _.bind(function(ev) {
					$input.val("").focus();
					this.update(null);
					ev.preventDefault();
				}, this));
			}
		},
		inputEvent: function(ev) {
			this.update(ev.target.value);
		}
	};

	return ServicesFilter;
});