var todayTemp = document.getElementById('current-temp');
var todayWind = document.getElementById('current-wind');
var todayHumid = document.getElementById('current-humid');
var todayUV = document.getElementById('current-uv');
var todayCity = document.getElementById('city-header');
var forecastTemp = document.getElementById('daily-temp');
var forecastWind = document.getElementById('daily-wind');
var forecastHumid = document.getElementById('daily-humid');
var forecastDate = document.getElementById('date-input');
var searchResults = document.getElementsByClassName('search-item');

// Pulling city location from html
var userCity = "";
var userCity_test = 'New York';
var submitBtn = document.getElementById('custom-btn');

// Function for what happens when the user clicks the button to show them weather by city input
// ** Can't get this to return input value to var userCity **
function getUserInput() {
  userCity = document.getElementById('userCity').value;
  console.log(userCity);
  localStorage.setItem('citySearch', userCity);
  searchResults.textContent = localStorage.getItem('searchCity');
  return userCity;
};

// getUserInput();

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
      displayIcon(data);
      displayDate(data);
      displayForecast(data);
      return data;
    })
    //   catch any errors
    .catch(function () {
    });
};

// Function to display current weather data on web page
function displayWeather(data) {
  var currentdate = new Date();
  var month = String(currentdate.getMonth() + 1).padStart(2, '0');
  var day = String(currentdate.getDate()).padStart(2, '0');
  var year = currentdate.getFullYear();
  var currentDate = month + "/" + day + "/" + year;
  var currentTemp = data.current.temp;
  console.log('Temp:', currentTemp);
  var currentWind = data.current.wind_speed;
  console.log('Wind:', currentWind);
  var currentHumid = data.current.humidity;
  console.log('Humidity:', currentHumid);
  var currentUV = data.current.uvi;
  console.log('UV:', currentUV);
  let Temp = currentTemp.toFixed(1);
  todayCity.textContent = userCity_test + " (" + currentDate + ")";
  todayTemp.textContent = "Temp: " + Temp + '\u00B0F ';
  todayWind.textContent = "Wind: " + currentWind + " MPH";
  todayHumid.textContent = "Humidity: " + currentHumid + " %";
  todayUV.textContent = "UV Index: " + currentUV;
  return data;
};

// Pull weather icon for 5-day forecast
function displayIcon(data) {
  for (let i = 1; i < 6; i++) {
    var iconCode = data.daily[i].weather[0].icon;
    var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
    console.log(iconUrl);
    // ** How do I add array of icons to each #wicon in HTML?**
    $('#wicon').attr('src', iconUrl)
  }
};

// Convert daily dt to legible date for 5-day forecast
function displayDate(data) {
  for (let i = 1; i < 6; i++) {
    const dailyDt = data.daily[i].dt;
    const date = new Date(dailyDt * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dailyTime = `${month}/${day}/${year}`;
    console.log("Date:", dailyTime);
     // ** How do I add array of dailyTime to each forecastDate in HTML?**
    forecastDate.textContent = dailyTime;
  }
};

// Function to display 5-day forecast on web page
function displayForecast(data) {
  for (let i = 1; i < 6; i++) {
  var dailyTemp = data.daily[i].temp.day;
  console.log('Temp:', dailyTemp);
  var dailyWind = data.daily[i].wind_speed;
  console.log('Wind:', dailyWind);
  var dailyHumid = data.daily[i].humidity;
  console.log('Humidity:', dailyHumid);
  let dTemp = dailyTemp.toFixed(1);
  console.log(dTemp);
   // ** How do I add array of data to each respective element in HTML?**
  forecastTemp.textContent = "Temp: " + dTemp + '\u00B0F ';
  forecastWind.textContent = "Wind: " + dailyWind + " MPH";
  forecastHumid.textContent = "Humidity: " + dailyHumid + " %";
  }
};
