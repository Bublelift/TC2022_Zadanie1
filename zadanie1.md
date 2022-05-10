#Zadanie 1
##a)
```js
const express = require('express')
const http = require('http')
const path = require('path')
const app = express()

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var hh = String(today.getHours()).padStart(2, '0');
var min = String(today.getMinutes()).padStart(2, '0');
var ss = String(today.getSeconds()).padStart(2, '0');
today = `${dd}.${mm}.${yyyy} ${hh}:${min}:${ss}`;

//Kod odpowiedzialny za pozostawianie w logach wymaganych informacji
require("fs").appendFile('logs.txt', `${today} - Jakub Kleszko - port 8080\n`, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

app.use(express.urlencoded({
    extended: true
}))

//Kod odpowiedzialny za wyświetlenie strony
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(8080)
```
##b)
```html
<html>

<head>
  <script>
    var lat;
    var lng;
    fetch('http://api.ipstack.com/check?access_key=eab860cdc9405f69663ecf1c4e055157')
      .then(res => res.json())
      .then((out) => {
        lat = out.latitude;
        lng = out.longitude
        document.write('IP: ' + out.ip + '<br>');
        fetch(`http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=hhhhh`)
          .then(res => res.json())
          .then((wynik) => {
            document.write(`Czas w ${wynik.countryName}: ${wynik.time}<br>`);
            document.write(`Słońce wstaje o ${wynik.sunrise} i zachodzi o ${wynik.sunset}`);
          }).catch(err => console.error(err));
      }).catch(err => console.error(err));
  </script>
</head>

<body>
</body>

</html>
```
Strona przesyła żądanie do API zwracającego adres IP osoby odwiedzającej stronę. Zwracane są także dane o jego geolokalizacji, które wykorzystuję, żeby przesłać żądanie do innego API, które na podstawie szerokości i długości geograficznej zwraca informacje o czasie lokalnym użytkownika.

#Zadanie 2
```dockerfile
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
```

#Zadanie 3
##a) Zbudowanie kontenera
```
docker build -t serwer1 .
```
##b) Uruchomienie kontenera
```
dodocker run -d --name serwer1 -p 8080:8080 serwer1cker run -d --name serwer1 -p 8080:8080 serwer1
```
##c) Dostęp do logów
```
docker exec -it serwer1 sh -c "cat logs.txt"
```
##d) Sprawdzenie ilości warstw
```
docker history serwer1
```
lub
```
docker image inspect serwer1
```

#Zadanie 4
Dostęp do architektur za pomocą qemu:
```
sudo apt-get install -y qemu-user-static
```
Następnie
```
docker buildx build -t bublelift/projekt1:image --platform linux/arm/v7,linux/arm64/v8,linux/amd64 --push .
```
*Niestety zamknąłem już konsolę, a nie chce mi się powtarzać tego punktu, dlatego proszę uwierzyć mi na słowo, że polecenie zadziałało. Dowód na dockerhubie*