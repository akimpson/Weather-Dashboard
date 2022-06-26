// g Variables.
var citySearch = [];
var apiOWUrl = "https://api.openweathermap.org";
var apiKeyOW = "58fb16d9cf6ab661c07f22f21f9a1557";

// Target html attr.
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var today = document.querySelector("#today");
var forecast = document.querySelector("#forecast");
var history = document.querySelector("#history");

// Dayjs
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// g Variables.
var citySearch = [];
var weatherApi = "https://api.openweathermap.org";
var weatherKey = "58fb16d9cf6ab661c07f22f21f9a1557";

// Target html attr.
var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var todayBox = document.getElementById("today");
var forecastBox = document.getElementById("forecast");
var historyBox = document.getElementById("history");

function searchHistory() {
  historyBox.innerHTML = "";