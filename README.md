# Documents service
Node service for rendering PDF documents from HTML templates.

## Running the service
* clone this repository
* run npm install
```
    npm install
```
* run the service
```
    node app.js
```
* optionally specify custom templates folder
```
    node app.js /var/tmp/templates
``` 

## Using the service
The service is running on port 3000 by default. To test it get the index:
```
    curl http://localhost:3000/
``` 

Generate and download test pdf:
```
curl -X POST -o test.pdf \
  http://localhost:3000/documents/test.html/render \
    -H 'Content-Type: application/json' \
    -d '{
	"company": "test",
	"model": {
		"title": "Test title"
	}
}'
```
 