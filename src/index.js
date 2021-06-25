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
let iconElement = document.querySelector("#icon");

function showTemp(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

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

function searchLocation(position) {
  let apiKey = "1f7c6137aa0f0d34113179b71073a3d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Portland");
