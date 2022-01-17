// Pulling Weather API data and appending to webpage
var userCity_test = 'Chicago';
// var userCity = document.getElementbyID("user-location"); [user input - this will replace the userZip_test above]
var userLat = "";
var userLng = ""; 

// API variables:
var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' +userCity_test+ ',us&appid=be4771db9c53103bf67e6e18d9ddacc6&units=imperial';
var oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +userLat+ '&lon=' +userLng+ '&appid=be4771db9c53103bf67e6e18d9ddacc6&units=imperial';

// Function to get longitude & latitude from city name
function getData(URL){
    fetch(URL, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key":"dc52e1306fmsh499b745225e0ed7p1f9230jsnd35ba4c60dc2" //this is the key for the paid subscription
            // "x-rapidapi-key": "2ad8fcafecmsh3b2f55fa0261ecfp1301a0jsn70db2fbb2f15"
        }
        })
        .then(response => {
            return response.json();
        })
        .then(function(data){
            console.log(data);
            // cityID = data.data[0].id.toString();
            userLat = cityData.latitude;
            userLng = cityData.longitude;

            getApi(oneCallUrl, index);

            return data;
        })
        .catch(err => {
            console.error(err);
        });
};

// getData(URL);

// Get Weather data for results page
function getApi(oneCallUrl, index) {
    fetch(oneCallUrl)
      .then(function (response) {
        if (response.status === 200) {
          }
          return response.json();
      })
      .then(function(data){
          console.log (data)
          displayWeather(data, index);
          return data;
      })
    //   catch any errors
      .catch(function(){
      });
    };

    // getApi(oneCallUrl2);

// Function to display weather data on web page
function displayWeather(data, index){
  var currentF = document.getElementsByClassName('currentF');
  var weatherDescrip = document.getElementsByClassName('weather-description');
  var weatherHiLo = document.getElementsByClassName('weather-HiLo');
  var currentTemp = data.current.temp;
  var iconCode = data.current.weather[0].icon;
  var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
  var highTemp = data.daily[0].temp.max;
  var lowTemp = data.daily[0].temp.min;
  var feelsLike = 'Feels Like:' + data.current.feels_like;
  var sunCloud = data.current.weather[0].description;
  var sunnyCloudy = sunCloud.charAt(0).toUpperCase() + sunCloud.slice(1);
  let Temp = currentTemp.toFixed(1);
  let highF = highTemp.toFixed(1);
  let lowF = lowTemp.toFixed(1);
  currentF[index].textContent = Temp + '\u00B0F '
//   Still need to correct spacing & embed weather icon - var iconUrl - into html 
  weatherDescrip[index].textContent = sunnyCloudy;
  weatherHiLo[index].textContent = 'H: ' + highF + '\u00B0 L: ' +lowF + '\u00B0';
};

