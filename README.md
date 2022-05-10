This repository contains files for a docker container with server app, that logs to file author's information, time of starting a container and exposed port. The server displays in web browser current IP that has been connected to site and current time in user's timezone.

#dockerfile
Base engine for container is node:apline.
2 files are copied into the */serwer* folder on container. These files are necessary for server to work. Then the directory is switched to the mentioned above. The TCP port 8080 is exposed for server. Then express and other dependecies for server are installed. Finally server runs the index file.

#index.js
A simple express app that logs information into a text file everytime it starts and also displays webpage at *localhost:8080/*.

#index.html
A file with empty body, that uses javascript as source of content. I use 2 API services, first gets the IP and geolocation of a visitor, then visitor's longitude and latitude are parsed into the request for the next API, that returns user's local time.

*My private API token is left in the code as I will not need it anymore*

#How to build it
First move all the files in one directory, then open terminal in this location and use following commands:
```
docker build -t <image tag> .
```
Then run the container using:
```
docker run -d --name <container name> -p 8080:8080 <image tag>
```
After that you will be able to enter in your browser
```
localhost:8080/
```
and display the site.

When in need of entering the container, use:
```
docker exec -it <container name> sh
```
**Log file's location is /serwer/logs.txt**
