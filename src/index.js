//display day&time
function formatDate(date) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day} ${hour}:${min}`;
}

let today = document.querySelector("#date-time");
let now = new Date();
today.innerHTML = formatDate(now);

//forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  console.log(displayForecast);
  let forecastHTML = `<div class= "forecast row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `   <div class="col-sm-2">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${formatDay(
                  forecastDay.dt
                )}<img id="icon" src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt=""></h5>
                <p class="card-text"><ul>
                  <li class ="weather-forecast-temperature-max">
                    H ${Math.round(forecastDay.temp.max)}˚
                  </li>
                  <li class = "weather-forecast-temperature-min">
                    L ${Math.round(forecastDay.temp.min)}˚
                  </li>
                </ul>
              </div>
            </div>
          </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1f7c6137aa0f0d34113179b71073a3d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//show weather
function showTemp(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#city-name");
  let humidityElement = document.querySelector("#real-humidity");
  let windElement = document.querySelector("#real-wind");
  let iconElement = document.querySelector("#icon");
  console.log(response);
  farenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(farenheitTemperature);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#current-temperature").innerHTML =
    Math.round(farenheitTemperature);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
//search city
function searchCity(city) {
  let apiKey = "1f7c6137aa0f0d34113179b71073a3d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
//use location
function searchLocation(position) {
  let apiKey = "1f7c6137aa0f0d34113179b71073a3d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
//farenheit&celsius link

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let celsiusTemperature = ((farenheitTemperature - 32) * 5) / 9;
  let showTemp = document.querySelector("#current-temperature");
  showTemp.innerHTML = Math.round(celsiusTemperature);
}
function showFarenheitTemperature(event) {
  event.preventDefault();
  farenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let showTemp = document.querySelector("#current-temperature");
  showTemp.innerHTML = Math.round(farenheitTemperature);
}
let farenheitTemperature = null;

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemperature);

searchCity("Portland");
