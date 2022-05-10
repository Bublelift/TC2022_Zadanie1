#na początku użyłem node:latest, ale ważył 1gb
FROM node:alpine
LABEL maintainer="Jakub Kleszko"

#pliki serwera
COPY index.html index.js /serwer/

#przejście do folderu z serwerem
WORKDIR /serwer/

#serwer bedzie działał na porcie 8080
EXPOSE 8080/tcp

#budowanie serwera
RUN npm init -y &&\	
 npm install express --save

#odpalenie serwera
CMD ["node", "index"]	
