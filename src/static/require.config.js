var require = {
    baseUrl: "./static/app",
    paths: {
         "backbone": "../lib/backbone-min",
         "underscore": "../lib/underscore-min",
         "jquery": "../lib/jquery-1.10.2.min",
         "tpl": "../lib/tpl",
         "text": "../lib/text"
    },
    shim: {
        "backbone": {
            "deps": ["underscore", "jquery"],
            "exports": "Backbone"  //attaches "Backbone" to the window object
        },
        "underscore": {
            "exports": "_"
        },
        "jquery": {
        	"exports": "$"
        }
    },
    enforceDefine: true
};

