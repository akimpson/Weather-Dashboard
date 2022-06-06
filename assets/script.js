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
