const WEATHER_API_KEY = "d6940738d6d84f19747c5417f864cd84";
const WEATHER_API = "https://api.openweathermap.org";
const defaultCoords = { lat: 33.625274, lon: -112.21869 };
const NPS_API = "https://developer.nps.gov/api/v1/parks";
const NPS_API_KEY = "qDb5LykvTUnnmM94EkVANsbmeVZKRH2HSwj77Y5t";

var latitude;
var longitude;

var getLatLon = function (city) {
  $(".searchBtn").on("click", function () {
    city = $("#inputBox").val();
    $("#inputBox").val("");
    var searchHistoryEl = document.createElement("a");
    searchHistoryEl.classList = "list-group-item list-group-item-action";
    searchHistoryEl.textContent = city;
    $(".searchHistory").append(searchHistoryEl);

    console.log(city);
    var geoCodingUrl =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&appid=8b8fc4ff13d3364c2bca42400b9f7011";

    fetch(geoCodingUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data[0].lat, data[0].lon);
        latitude = data[0].lat;
        longitude = data[0].lon;
        getWeather(latitude, longitude, city);
      });
  });

  // Create a function to return the city;
};
var getWeather = function (latitude, longitude, city) {
  $("#currentCity").text(city);
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=imperial&appid=8b8fc4ff13d3364c2bca42400b9f7011";

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $(".currentTemp").text(data.current.temp + " F");
      $(".currentWind").text(data.current.wind_speed + " MPH");
      $(".currentHumidity").text(data.current.humidity + " %");
      $(".currentUvIndex").text(data.current.uvi);
      if (data.current.uvi <= 2) {
        $(".currentUvIndex").addClass("currentUvIndexGreen");
      } else if (data.current.uvi >= 5) {
        $(".currentUvIndex").addClass("currentUvIndexYellow");
      } else if (data.current.uvi > 6) {
        $(".currentUvIndex").addClass("currentUvIndexRed");
      }
    });
};

var getSearchHistory = function () {};

getLatLon();
