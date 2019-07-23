# Documents service
Node service for rendering PDF documents from HTML templates.

Uses puppeteer to render PDF.

Work in progress...

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
Additional packages for chromium could be needed. This is an example for Ubuntu 16.04:
```
sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
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
		"title": "Test title",
		"imageLogo": "logo.png",
		"imageMouse: "mouse.jpg"
	}
}'
```

Note that images provided locally should be specified as a property starting with `image` so that they would be encoded (_checkout the template test.html_)
 