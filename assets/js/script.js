var todayTemp = document.getElementById('current-temp');
var todayWind = document.getElementById('current-wind');
var todayHumid = document.getElementById('current-humid');
var todayUV = document.getElementById('current-uv');
var todayCity = document.getElementById('city-header');

// Pulling city location from html
var userCity = document.getElementById('userCity').value;
console.log(userCity);
var userCity_test = 'New York';
var submitBtn = document.getElementById('custom-btn');

// Function for what happens when the user clicks the button to show them weather by city input
submitBtn.onclick = function () { submitHandler() };

function submitHandler() {
  userCity = document.getElementById('userCity').value;
  localStorage.setItem('citySearch', userCity);
  document.getElementsByClassName('list-group').innerHTML = localStorage.getItem('searchCity');
};

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
      displayWeather(data);
      displayForecast(data);
      return data;
    })
    //   catch any errors
    .catch(function () {
    });
};

// Function to display current weather data on web page
function displayWeather(data) {
  var currentTemp = data.current.temp;
  console.log('Temp:', currentTemp);
  var currentWind = data.current.wind_speed;
  console.log('Wind:', currentWind);
  var currentHumid = data.current.humidity;
  console.log('Humidity:', currentHumid);
  var currentUV = data.current.uvi;
  console.log('UV:', currentUV);
  let Temp = currentTemp.toFixed(1);
  todayCity.textContent = userCity_test;
  todayTemp.textContent = "Temp: " + Temp + '\u00B0F ';
  // The code below for todayWind is not working...
  todayWind.textContent = "Wind: " + currentWind + " MPH";
  todayHumid.textContent = "Humidity: " + currentHumid + " %";
  todayUV.textContent = "UV Index: " + currentUV;
  return data;
};

// Function to display 5-day forecast on web page
function displayForecast (data) {
    // Convert daily dt to legible date for 5-day forecast
    const dailyDt = data.daily[1].dt;
    const date = new Date(dailyDt * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dailyTime = `${month}/${day}/${year}`;
    console.log(dailyTime);
    // Pull weather icon for 5-day forecast
    var iconCode = data.daily[1].weather[0].icon;
    var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
    console.log(iconUrl);
    $('#wicon').attr('src', iconUrl);
};
