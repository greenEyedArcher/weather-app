$(document).ready(function(){
  //Initialize the main variables
  var lat, long, temp, api;

  //Requests the current position
  navigator.geolocation.getCurrentPosition(function(position) {
    //Makes an url request
    lat = position.coords.latitude;
    long = position.coords.longitude;
    url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=ed00edd24e4b1ac0d6a9bedf26d1d4ee&callback=?";
    console.log(url);


    $.getJSON(url, function(data) {
      //Declares the needed variables
      var weatherType = data.weather[0].description;
      var kelvin = data.main.temp;
      var city = data.name;
      var celcius = Math.round(kelvin - 273.15);
      var fTemp = Math.round(celcius * 1.8 + 32);
      var windSpeed = data.wind.speed;

      //Adds text to the list
      $('#temp').append("Temperature: " + celcius + "&#8451;");
      $("#weatherType").append(weatherType);
      $('#windSpeed').append("Wind speed: " + windSpeed + " m/s");
      $('#city').append(city);

      //Changes the background and the icon
      //weatherType = "";     <--- TEST
      switch (weatherType) {
        case "clear sky":
          $('.window .container').css("background", "url(http://www.imageafter.com/dbase/textures/elements/b21tabus848.jpg) no-repeat center center");
          $('.weather-icon').html("<img src='weather-icons/clear-sky.psd'>");
          break;
        case "light rain":
          $('.window .container').css("background", "url(http://www.playcast.ru/uploads/2016/12/01/20721577.jpg) no-repeat center center");
          $('.weather-icon').html("<img src='weather-icons/light-rain.psd'>");
          break;
        case "few clouds":
          $('.window .container').css("background", "url(https://im0-tub-ru.yandex.net/i?id=2f385480f3d7b266fe7dbf2040262bdb&n=33&h=215&w=382) no-repeat center center");
          $('.weather-icon').html("<img src='weather-icons/few-clouds.psd'>");
          break;
        case "heavy rain":
          $('.window .container').css("background", "url(https://wallinsider.com/wp-content/uploads/2017/05/Rainy-Weather-Desktop-Wallpapers.jpg) no-repeat center center");
          $('.weather-icon').html("<img src='weather-icons/heavy-rain.psd'>");
          break;
      }

      //Changes temperature metrics
      var changeWeather = true;
      $(".switch-scale").click(function() {
        if (changeWeather === true) {
          //I don't know how this works. I copied this from stackoverflow.
          $("#temp").contents().filter(function() {
            return this.nodeType === 3;
          });
          $("#temp").html("Temperature: " + fTemp + "&#8457;");
          changeWeather = false;
        } else {
          $("#temp").contents().filter(function() {
            return this.nodeType === 3;
          });
          $("#temp").html("Temperature: " + celcius + "&#8451;");
          changeWeather = true;
        }
      });

    });
  });
});
