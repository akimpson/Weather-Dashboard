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

  // create buttons
  for (var i = citySearch.length - 1; i >= 0; i--) {
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-controls", "today forecast");
    btn.classList.add("history-btn", "btn-history");

    btn.setAttribute("data-search", citySearch[i]);
    btn.textContent = citySearch[i];
    historyBox.append(btn);
  }
}
// Create local storage functions.
function addToHistory(search) {
  if (citySearch.indexOf(search) !== -1) {
    return;
  }
  citySearch.push(search);
  localStorage.setItem("search-history", JSON.stringify(citySearch));
  searchHistory();
}
function initHistory() {
  var localHistory = localStorage.getItem("search-history");
  if (localHistory) {
    citySearch = JSON.parse(localHistory);
  }
  searchHistory();
}

function renderFunctions(city, data) {
  currentWeather(city, data.current, data.timeZone);
  forecastWeather(data.daily, data.timezone);
}

function forecastCard(forecast, timezone) {
  var unixTime = forecast.dt;
  var wind = forecast.wind_speed;
  var { humidity } = forecast;
  var tempf = forecast.temp.day;
  var iconDescription = forecast.weather[0].description;
  var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

  // Create card.
  var col = document.createElement("div");
  var card = document.createElement("div");
  var cardBody = document.createElement("div");
  var cardTitle = document.createElement("h5");
  var weatherIcon = document.createElement("img");
  var tempEl = document.createElement("p");
  var windEl = document.createElement("p");
  var humidityEl = document.createElement("p");

  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

  col.setAttribute("class", "col-md");
  col.classList.add("five-day-card");
  card.setAttribute("class", "card bg-primary h-100 text-white");
  cardBody.setAttribute("class", "card-body p-2");
  cardTitle.setAttribute("class", "card-title");
  tempEl.setAttribute("class", "card-text");
  windEl.setAttribute("class", "card-tex");
  humidityEl.setAttribute("class", "card-text");

  // Add content.
  cardTitle.textContent = dayjs.unix(unixTime).tz(timezone).format("M/D/YYYY");
  weatherIcon.setAttribute("src", iconUrl);
  weatherIcon.setAttribute("alt", iconDescription);
  tempEl.textContent = `Temp: ${tempf}°F`;
  windEl.textContent = `Wind: ${wind} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  forecastBox.append(col);
}

function forecastWeather(dailyForecast, timezone) {
  // establish start and end of day
  var startDay = dayjs().tz(timezone).add(1, "day").startOf("day").unix();
  var endDay = dayjs().tz(timezone).add(6, "day").startOf("day").unix();

  var colHeading = document.createElement("div");
  var heading = document.createElement("h3");
  colHeading.setAttribute("class", "col-12");
  heading.textContent = "5 Day Forecast";
  colHeading.append(heading);

  forecastBox.innerHTML = "";
  forecastBox.append(colHeading);

  // Create for loop for the daily forecast.
  for (var i = 0; i < dailyForecast.length; i++) {
    if (dailyForecast[i].dt >= startDay && dailyForecast[i].dt < endDay) {
      forecastCard(dailyForecast[i], timezone);
    }
  }
}

function currentWeather(city, weather, timezone) {
    var date = dayjs().tz(timezone).format("M/D/YYYY");

    