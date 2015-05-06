({
	mainConfigFile: "require.config.js",
	baseUrl: "app",
	out: "service-catalogue.min.js",
	name: "../lib/almond",
	stubModules: ['text', 'tpl'],
	include: ['main'],
	insertRequire: ['main']
})
