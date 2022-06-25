// g variables
var citySearch = [];
var apiOWUrl = "https://api.openweathermap.org";
var apiKeyOW = "58fb16d9cf6ab661c07f22f21f9a1557";

// target html attr
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var today = document.querySelector("#today");
var forecast = document.querySelector("#forecast");
var history = document.querySelector("#history");

// Dayjs
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function fetchGeo(search) {
  var apiUrl = `${apiOWUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKeyOW}`;
  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert("city not found");
      } else {
        addToHistory(search);
        getWeather(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}
function getWeather(location) {
  var { lat, lon } = location;
  var city = location.name;

  var apiUrl = `${apiOWUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKeyOW}`;
  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderFunctions(city, data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function renderFunctions(city, data) {
  currentWeather(city, data.current, data.timeZone);
  forecastWeather(data.daily, data.timezone);
}
function forecastWeather(dailyforecast, timezone) {
  // establish start and end of day
  var startDay = dayjs().tz(timezone).add(1, "day").startOf("day").unix();
  var endDay = dayjs().tz(timezone).add(6, "day").startOf("day").unix();

  var colHeading = document.createElement("div");
  var heading = document.createElement("h3");
  colHeading.setAttributes("class", "col-12");
  heading.textContent = "5 Day Forecast";
  colHeading.append(heading);
  forecast.innerHTML = "";
  forecast.append(colHeading);

  // for loop
  for (var i = 0; i < dailyforecast.length; i++) {
    if (dailyforecast[i].dt >= startDay && dailyforecast[i].dt < endDay) {
      forecastCard(dailyforecast[i], timezone);
    }
  }
}

function forecastCard(forecast, timezone) {
  var unixTime = forecast.dt;
  var wind = forecast.wind_speed;
  var { humidity } = forecast;
  var tempf = forecast.temp.day;
  var iconDescription = forecast.weather[0].description;
  var uvi = weather.uvi;
  var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

  // create card
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
  cardBody.append(cardTitle, tempEl, windEl, humidityEl, weatherIcon);

  col.setAttribute("class", "col-md");
  col.classList.add("five-day-card");
  card.setAttribute("class", "card bg-primary h-100 text-white");
  cardBody.setAttribute("class", "card-body p-2");
  cardTitle.setAttribute("class", "card-title");
  tempEl.setAttribute("class", "card-text");
  windEl.setAttribute("class", "card-tex");
  humidityEl.setAttribute("class", "card-text");

  // add content
  cardTitle.textContent = dayjs.unix(unixTime).tz(timezone).format("M/D/YYYY");
  weatherIcon.setAttribute("src", iconUrl);
  weatherIcon.setAttribute("alt", iconDescription);
  tempEl.textContent = `Temp: ${tempf}`;
  windEl.textContent = `Wind: ${wind}`;
  humidityEl.textContent = `Humidity: ${humidity}`;

  forecast.append(col);
}

function currentWeather(city, weather, timezone) {
  var date = dayjs().tz(timezone).format("M/D/YYYY");

  // insert the data from the fetch request
  var tempf = weather.temp;
  var wind = weather.wind_speed;
  var humidity = weather.humidity;
  var uvi = weather.uvi;
  var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  // create card
  var card = document.createElement("div");
  var cardBody = document.createElement("div");
  var heading = document.createElement("h2");
  var weatherIcon = document.createElement("img");
  var tempEl = document.createElement("p");
  var windEl = document.createElement("p");
  var humidityEl = document.createElement("p");
  var uvEl = document.createElement("p");
  var uviBtn = document.createElement("button");

  // add attributes
  card.setAttribute("class", "card");
  cardBody.setAttribute("class", "card-body");
  card.apphend(cardBody);

  heading.setAttribute("class", "h3 card-title");
  tempEl.setAttribute("class", "card-text");
  windEl.setAttribute("class", "card-text");
  humidityEl.setAttribute("class", "card-text");

  heading.textContent = `${city} (${date})`;
  weatherIcon.setAttribute("src", iconURL);
  weatherIcon.setAttribute("class", "weather-img");
  heading.apphend(weatherIcon);
  tempEl.textContent = `Temp: ${tempf}`;
  windEl.textContent = `Wind: ${wind}`;
  humidityEl.textContent = `Humidity: ${humidity}`;
  cardBody.apphend(heading, tempEl, windEl, humidityEl);

  uvEl.textconten = "uv index: ";
  uviBtn.classList.add("btn", "btn-sm");

  // UV conditional
  if (uvi < 3) {
    uviBtn.classList.add("btn-success");
  } else if (uvi < 7) {
    uviBtn.classList.add("btn-warning");
  } else {
    uviBtn.classList.add("btn-danger");
  }
  uviBtn.textContent = uvi;
  uvEl.append(uviBtn);
  cardBody.append(uvEl);
  today.innerHTML = "";
  today.append(card);
}
function searchHistory() {
  history.innerHTML = "";
  // create buttons
  for (var i = citySearch.length - 1; i >= 0; i--) {
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-controls", "today forecast");
    btn.classList.add("history-btn", "btn-history");
    btn.setAttribute("data-search", citySearch[i]);
    btn.textContent = citySearch[i];
    history.append(btn);
  }
}

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

function formSubmit(e) {
  e.preventDefault();
  var search = searchInput.value.trim();
  fetchGeo(search);
  searchInput.value = "";
}

function historyClick(e) {
  if (!e.target.matches(".btnHistory")) {
    return;
  }
  var btn = e.target;
  var search = btn.getAttributes("data-search");
  fetchGeo(search);
}
// history.addEventListener("click", historyClick);
initHistory();
searchForm.addEventListener("submit", formSubmit);
history.onClick = historyClick;
