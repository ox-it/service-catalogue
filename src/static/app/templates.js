define([
        'tpl!templates/all',
        'tpl!templates/category',
        'tpl!templates/category-aside',
        'tpl!templates/category-list',
        'tpl!templates/index',
        'tpl!templates/not-found',
        'tpl!templates/service',
        'tpl!templates/service-in-list',
        'tpl!templates/status',
        'tpl!templates/status-inner'
], function(
		all,
		category,
		categoryAside,
		categoryList,
		index,
		notFound,
		service,
		serviceInList,
		status,
		statusInner) {
	return {
		all: all,
		category: category,
		categoryAside: categoryAside,
		categoryList: categoryList,
		index: index,
		notFound: notFound,
		service: service,
		serviceInList: serviceInList,
		status: status,
		statusInner: statusInner
	};
});