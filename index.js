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

require("fs").appendFile('logs.txt', `${today} - Jakub Kleszko - port 8080\n`, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

app.use(express.urlencoded({
    extended: true
}))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(8080)