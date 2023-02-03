// variables for search and location
let updateLocation = document.querySelector("#location");
let currentLocationBtn = document.querySelector("#current-location");
let searchInput = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search-button");

let temperature = document.querySelector("#temp");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let weatherDescription = document.querySelector("#desc");

// Date variables
let dateUnit = document.querySelector("#date");
let currentDate = new Date();
// function for Date
function formatDay(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentHour = `0${currentMinute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[date.getDay()];
  return `${currentDay} ${currentHour}:${currentMinute}`;
}
dateUnit.innerHTML = formatDay(currentDate);

// Update the temperature when the search button is clicked or when the user press enter
searchBtn.addEventListener("click", updateWeather);
searchInput.addEventListener("search", updateWeather);

function updateCityAndTemp(response) {
  updateLocation.innerHTML = response.data.name;
  temperature.innerHTML = `${Math.round(response.data.main.temp)}℃`;
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}℃`;
  wind.innerHTML = `Wind speed: ${response.data.wind.speed}km/h`;
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
}

function updateWeather(event) {
  event.preventDefault();
  let apiKey = "060c7c61814c1dd7e9362ab95b9026ea";
  let cityName = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(updateCityAndTemp);
}

// Events for getting the current location
currentLocationBtn.addEventListener("click", getCurrentLocation);
currentLocationBtn.addEventListener("search", getCurrentLocation);

function searchLocation(position) {
  let apiKey = "060c7c61814c1dd7e9362ab95b9026ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  console.log(apiKey);
  axios.get(apiUrl).then(updateCityAndTemp);
}
// Show the current location of the user
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
