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