// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
  res.render("home");
});

app.post("/",function(req,res){

  const city = req.body.city ;
  const country = req.body.country;
  const apiKey = process.env.API_KEY;
  const  baseUrl = "https://api.weatherbit.io/v2.0/current?" + "city=" + city + "&country=" + country +"&key=" + apiKey;
                                                                                                                                                
request(baseUrl,function(error,response,body){
    if(error){
      console.log(error);
    }
    else{
    var responseData = JSON.parse(body);

  //console.log(responseData.data[0].aqi);
  
  var aqi =  responseData.data[0].aqi ;
  var weather = responseData.data[0].weather.description ;
  var dateTime = responseData.data[0].datetime ;
                                                                                           
res.render("data",{city : city,country : country,aqi : aqi,dateTime:dateTime,weather:weather});
}});
});

app.get("/contact",function(req,res){
  res.render("contact");
});

app.get("/features",function(req,res){
  res.render("home");
});

 const port = process.env.PORT;

app.listen(3000 || port,function(){
  console.log("Server is running at port 3000");
});


