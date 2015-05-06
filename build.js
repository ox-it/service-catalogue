({
	mainConfigFile: "static/require.config.js",
	baseUrl: "static/app",
	out: "static/app/main-built.js",
	name: "../lib/almond",
	stubModules: ['text', 'tpl'],
	include: ['main'],
	insertRequire: ['main']
})
