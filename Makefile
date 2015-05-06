build: service-catalogue.min.js

service-catalogue.min.js:
	r.js -o build.js

clean:
	rm service-catalogue.min.js
