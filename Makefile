build: font-awesome service-catalogue.min.js

font-awesome:
	git submodule init
	git submodule update

service-catalogue.min.js:
	r.js -o build.js

clean:
	rm font-awesome -r
	rm service-catalogue.min.js
