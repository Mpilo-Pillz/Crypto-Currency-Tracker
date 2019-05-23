//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

// app.post("/", function(req, res){
//     //console.log(req.body.crypto);
//     var fiat = req.body.fiat;
//     var crypto = req.body.crypto;

//     var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
//     var finalURL = baseURL + crypto + fiat;

//     request(finalURL, function(error, response, body) {
    
//     var data = JSON.parse(body);
//     var price = data.last;

//     var currentDate = data.display_timestamp

//     res.write("<p>The current date is " + currentDate + "</p>");
//     res.write("<h1>The current price of " + crypto + " is " + price + fiat + "</h1>");

//     res.send();
//     console.log(price);
//     });
// });

app.post("/", function(req, res){
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
        from: crypto,
        to: fiat,
        amount: amount
    }
    };

    request(options, function(error, response, body) {
    
        var data = JSON.parse(body);
        var price = data.price;
    
        var currentDate = data.display_timestamp
    
        res.write("<p>The current date is " + currentDate + "</p>");
        res.write("<h1>" + amount + " of " + crypto + " is " + price + fiat + "</h1>");
    
        res.send();
        console.log(price);
        });
});

app.listen(3000, function() {
    console.log("MAPILOS server is on port 3000");
});