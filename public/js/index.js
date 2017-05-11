$("#celcius").hide();
$("#fahrenheit").hide();
$("#thermometer-background").hide();
$("#gray-bar").hide();
$("#numbers").hide();

var elMap = document.getElementById('coordinates');
var msg ='Sorry, we were unable to get your location.';



function getCoordinatesAndWeather() {
if (Modernizr.geolocation) {
  navigator.geolocation.getCurrentPosition(success, fail);
  elMap.textContent = 'Checking location...';
}

else {
  elMap.textContent = msg;
}

function success(position) {
  msg = "";
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  
  
function getWeather(callback) {
    var weather = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&cluster=yes&units=imperial&format=json&APPID=da49eff038e1cb3ed2a15aff35650a85'
    $.ajax({
      dataType: "json",
      url: weather,
      success: callback
    });
}
 

// get data:
getWeather(function (data) {
   var temperature = Math.round(data.main.temp);
    $("#picture").html("<img src= http://openweathermap.org/img/w/" + data.weather[0].icon + ".png>").toggleClass("fade-in");
    $("#weather").html(data.weather[0].main).toggleClass("fade-in");
    $("#in").html("in").toggleClass("fade-in");
    $("#location").html(data.name).toggleClass("fade-in");
    $("#temperature").html(Math.round(data.main.temp) + "° F").toggleClass("fade-in");
  $("#celcius").show().toggleClass("fade-in");
$("#fahrenheit").show().toggleClass("fade-in");
  $("#thermometer-background").show().toggleClass("fade-in");
$("#gray-bar").show().toggleClass("fade-in");
$("#numbers").show().toggleClass("fade-in");
    $("#red-bar").css('background', 'red').css({marginRight:(100 - (temperature / 140) * 100) + '%'}).toggleClass("fade-in");
  
fahr = $("#temperature").text().substring(0,2);
celc = Math.round((fahr - 32) * (5/9));
});
  
  elMap.innerHTML = msg;
  initialize(position);
}

function fail(msg) {
  elMap.textContent = msg;
  console.log(msg.code);
}

}

function celciusSwitch() {
  $("#temperature").html(celc + "° C");
  $("#middle-num").html("21");
  $("#right-num").html("60");
}

function fahrenheitSwitch() {
  $("#temperature").html(fahr + "° F");
  $("#middle-num").html("70");
  $("#right-num").html("140");
}