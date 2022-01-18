// Pulling city location from html
var userCity = document.getElementById('userCity');
var userCity_test = 'New York';

// Using Open Weather Geocode API for convering city to longitude & latitude
var geocodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userCity_test + '&appid=bec1cdd13d275e4702f754866932c17f'

function geocode() {
  fetch(geocodeUrl)
    .then(function (response) {
      if (response.status === 200) {
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getLngLat(data);
      return data;
    })
    //   catch any errors
    .catch(function () {
    });
};

geocode();

function getLngLat(data) {
  var userLat = data[0].lat;
  var userLng = data[0].lon;
  console.log("latitude:", userLat);
  console.log("longitude:", userLng);
  var oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + userLat + '&lon=' + userLng + '&appid=bec1cdd13d275e4702f754866932c17f&units=imperial';
  getApi(oneCallUrl, data);
};

// Get Weather data from Open Weather One Call API
function getApi(oneCallUrl) {
  fetch(oneCallUrl)
    .then(function (response) {
      if (response.status === 200) {
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      // displayWeather(data);
      return data;
    })
    //   catch any errors
    .catch(function () {
    });
};

// Function to display weather data on web page
// function displayWeather(data) {
//   var todayTemp = document.getElementsByClassName('current-temp');
//   var todayWind = document.getElementsByClassName('current-wind');
//   var todayHumid = document.getElementsByClassName('current-humid');
//   var todayUV = document.getElementsByClassName('current-uv');

//   var currentTemp = data.current.temp;
//   var currentWind = data.current.wind_speed;
//   var currentHumid = data.current.humidity;
//   var currentUV = data.current.uvi;
//   var iconCode = data.current.weather[0].icon;
//   var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
//   let Temp = currentTemp.toFixed(1);
//   todayTemp.textContent = "Temp: " + Temp + '\u00B0F ';
//   todayWind.texContent = "Wind: " + currentWind + "MPH";
//   todayHumid.textContent = "Humidity: " + currentHumid + " %";
//   todayUV.textContent = "UV Index: " + currentUV;

// For 5-day forecast
// };

