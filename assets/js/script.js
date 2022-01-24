var todayTemp = document.getElementById('current-temp');
var todayWind = document.getElementById('current-wind');
var todayHumid = document.getElementById('current-humid');
var todayUV = document.getElementById('current-uv');
var todayCity = document.getElementById('city-header');
var todayDate = document.getElementById('current-date');
var forecastDisplay = document.getElementById('forecast-display');
var forecastCard = document.getElementById('forecast-card');
var forecastDate = document.getElementById('date-input');
var forecastIcon = document.getElementById('wicon');
var forecastTemp = document.getElementById('daily-temp');
var forecastWind = document.getElementById('daily-wind');
var forecastHumid = document.getElementById('daily-humid');
var searchResults = document.getElementById('history');
var form = document.getElementById('search-form');
var searchHistory = [];
var arrayCards = [];
var arrayDataObject = [];

// Pulling city location from user input in HTML
var userCity = document.getElementById('userCity');

// Saves user city inputs into local storage and calls functions to get weather data and display results
function getUserInput(city) {
  searchHistory.push(city);
  localStorage.setItem('savedCity', JSON.stringify(searchHistory));
  geocode(city);
  loadCities()
};

// Displays user inputs for prior city searches on web page
//  ** How to delete duplicate from local storage and in the display
function loadCities() {
  searchResults.innerHTML = "";
  // searchResults.setAttribute("value", localStorage);
  // var storedValue = localStorage.getItem("savedCity");
  for (var i = 0; i < searchHistory.length; i++) {
    var buttonEl = document.createElement('button');
    buttonEl.setAttribute("value", searchHistory[i]);
    buttonEl.setAttribute("class", "search-button")
    buttonEl.textContent = searchHistory[i];
    searchResults.appendChild(buttonEl);
  }
};

// Using Open Weather Geocode API for converting city to longitude & latitude
function geocode(city) {
  var geocodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=bec1cdd13d275e4702f754866932c17f'
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

function getLngLat(data) {
  var userLat = data[0].lat;
  var userLng = data[0].lon;
  var cityInput = data[0].local_names.en
  var currentdate = new Date();
  var month = String(currentdate.getMonth() + 1).padStart(2, '0');
  var day = String(currentdate.getDate()).padStart(2, '0');
  var year = currentdate.getFullYear();
  var currentDate = month + "/" + day + "/" + year;
  console.log("latitude:", userLat);
  console.log("longitude:", userLng);
  console.log('Today:', currentDate);
  console.log("city:", cityInput);
  todayCity.textContent = cityInput + " (" + currentDate + ")"
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
      // displayIcon(data);
      // displayDate(data);
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
  todayTemp.textContent = "Temp: " + Temp + '\u00B0F ';
  todayWind.textContent = "Wind: " + currentWind + " MPH";
  todayHumid.textContent = "Humidity: " + currentHumid + " %";
  todayUV.textContent = "  " + currentUV + "  ";
  // set color of UV index for favorable (0-2), moderate (3-5), severe (6+)
  // ** how to fix spacing for highlighted color **
  if (currentUV < 3) {
    todayUV.setAttribute("style", "background-color: palegreen;");
  }
  else if (currentUV >= 3 || currentUV < 6) {
    todayUV.setAttribute("style", "background-color: yellow;");
  }
  else {
    todayUV.setAttribute("style", "background-color: tomato;");
  }
  return data;
};

// Function to display 5-day forecast on web page
function displayForecast(data) {
  // clear elements in forecastDisplay
  forecastCard.innerHTML = "";
  //  loop function to get data to populate 5-day forecast
  for (let i = 1; i < 6; i++) {
    // Convert daily dt to legible date for 5-day forecast
    const dailyDt = data.daily[i].dt;
    const date = new Date(dailyDt * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dailyTime = `${month}/${day}/${year}`;
    console.log("Date:", dailyTime);
    // Get weather icon
    var iconCode = data.daily[i].weather[0].icon;
    var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
    console.log(iconUrl);
    // Get data for temperature, wind, and humidity
    var dailyTemp = data.daily[i].temp.day;
    console.log('Temp:', dailyTemp);
    var dailyWind = data.daily[i].wind_speed;
    console.log('Wind:', dailyWind);
    var dailyHumid = data.daily[i].humidity;
    console.log('Humidity:', dailyHumid);
    let dTemp = dailyTemp.toFixed(1);
    console.log(dTemp);
    // // Consolidate data into array object
    // arrayDataObject[i] = {
    //   'time': dailyTime[i],
    //   'icon': iconUrl[i],
    //   'temp': dTemp[i],
    //   'wind': dailyWind[i],
    //   'humid': dailyHumid[i]
    // }
    // console.log('Date[i]:', arrayDataObject[i].time[i])
    // console.log('Temp[i]:', arrayDataObject[i].dTemp[i])

    // Create HTML elements for displaying data
    var newCard = forecastCard.clone();
    arrayCards[i + 1] = newCard;
    newCard.append(forecastCard);
    // lastCard=newCard;
    // newCard.insertAfter(lastCard);
    // Put data into HTML elements
    arrayCards[i].forecastDate.textContent = arrayDataObject[i].time;
    arrayCards[i].forecastIcon.setAttribute('src', arrayDataObject[i].icon);
    arrayCards[i].forecastTemp.textContent = "Temp: " + arrayDataObject[i].temp + '\u00B0F ';
    arrayCards[i].forecastWind.textContent = "Wind: " + arrayDataObject[i].wind + " MPH";
    arrayCards[i].forecastHumid.textContent = "Humidity: " + arrayDataObject[i].humid + " %";
  }
};

// Handles user city input upon submit
function handleFormsubmit(event) {
  event.preventDefault();
  var city = userCity.value.trim();
  getUserInput(city);
};

// Reloads city input into search and pulls new weather data from the savedCity list
function handleHistory(event) {
  var historyButton = event.target;
  var searchValue = historyButton.getAttribute("value");
  geocode(searchValue);
};

form.addEventListener("submit", handleFormsubmit);

searchResults.addEventListener("click", handleHistory);