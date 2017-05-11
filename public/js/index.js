function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getWeather(callback) {

    $.ajax({
      type: 'GET',
      dataType: "jsonp",
      url: 'http://marsweather.ingenology.com/v1/latest/?format=jsonp',
      success: callback
    });
}
 
function celciusSwitch() {

  $("#middle-num").html("21");
  $("#right-num").html("60");
}

function fahrenheitSwitch() {

  $("#middle-num").html("70");
  $("#right-num").html("140");
}

$(document).ready(function() {
  
getWeather(function (data) {
   var minTemperature = data.report.min_temp_fahrenheit;
   var maxTemperature = data.report.max_temp_fahrenheit;
   var windSpeed = String(data.report.wind_speed);
   var atmosphere = data.report.atmo_opacity;
   $("#maxTemp").html("Maximum Temperature: " + maxTemperature + "° F").toggleClass("fade-in");
    $("#minTemp").html("Minimum Temperature: " + minTemperature + "° F").toggleClass("fade-in"); 
  $("#windSpeed").html("Wind Speed: " + capitalizeFirstLetter(windSpeed)).toggleClass("fade-in");
  $("#atmosphere").html("Atmosphere: " + atmosphere).toggleClass("fade-in");
    $("#green-bar").css('background', '#40ff00').css({marginRight: ((100 - (maxTemperature) / 4) - 50)  + '%'}).toggleClass("fade-in");
  $("#yellow-bar").css('background', '#ffcc00').css({marginRight: ((100 - (minTemperature) / 4) - 50)  + '%'}).toggleClass("fade-in");
  
maxFahr = maxTemperature;
maxCelc = Math.round((maxFahr - 32) * (5/9));
  
minFahr = minTemperature;
minCelc = Math.round((minFahr - 32) * (5/9));
});

});


function celciusSwitch() {
  $("#maxTemp").html("Maximum Temperature: " + maxCelc + "° C");
  $("#minTemp").html("Minimum Temperature: " + minCelc + "° C");
  $("#left-num").html("-130");
  $("#middle-num").html("-18");
  $("#right-num").html("95");
}

function fahrenheitSwitch() {
  $("#maxTemp").html("Maximum Temperature: " + maxFahr + "° F");
  $("#minTemp").html("Minimum Temperature: " + minFahr + "° F");
  $("#left-num").html("-200");
  $("#middle-num").html("0");
  $("#right-num").html("200");
}