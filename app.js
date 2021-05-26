const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");
    });

  app.post("/",function(req,res){

    const query = req.body.cityName;
    console.log(query);
    const apiKey = config.SECRET_API_KEY;
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid="+apiKey+"&units="+units ;
    https.get(url,function(response){
      console.log(response.statusCode);
      response.on("data",function(data){
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;

        const imageURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";

        res.write("<h1>The temperature in " +query+ " is " + temp +" degrees celsius</h1>");
          res.write( "<img src=" +imageURL+ " >");
        res.write("<h2>The weather is currently "+desc +"</h2");

        res.send();
  });
});
  });




app.listen(3000,function(){
  console.log("Your server is running on port 3000" );
});
