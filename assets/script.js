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