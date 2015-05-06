build: font-awesome service-catalogue.min.js service-catalogue.min.css

font-awesome:
	git submodule init
	git submodule update

service-catalogue.min.js:
	r.js -o build.js

service-catalogue.min.css:
	cat css/basic.css \
	    css/tiny.css.prefix css/tiny.css css/all.css.suffix \
	    css/small.css.prefix css/small.css css/all.css.suffix \
	    css/medium.css.prefix css/medium.css css/all.css.suffix \
	    css/large.css.prefix css/large.css css/all.css.suffix | cssmin > service-catalogue.min.css

clean:
	rm font-awesome -r
	rm service-catalogue.min.js
	rm service-catalogue.min.css
