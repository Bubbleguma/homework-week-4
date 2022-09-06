let date = document.querySelector("#date");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
date.innerHTML = `${day} ${hour}:${minute}`;

let far = document.querySelector("#fahren");
far.addEventListener("click", change);
function change(event) {
  event.preventDefault();
  let link = document.querySelector("#num");
  link.innerHTML = `69.8`;
}
let cel = document.querySelector("#celsius");
cel.addEventListener("click", chang);
function chang(event) {
  event.preventDefault();
  let lin = document.querySelector("#num");
  lin.innerHTML = `21`;
}

function displayWeatherCondition(response) {
  document.querySelector("#place").innerHTML = response.data.name;
  document.querySelector("#num").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(city) {
  let apiKey = "89c9ecbba6dfb51142563de590c487ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "89c9ecbba6dfb51142563de590c487ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#city");
searchForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#cur");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Budapest");
