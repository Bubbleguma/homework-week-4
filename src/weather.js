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

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#num").innerHTML = Math.round(
    response.data.main.temp
  );
}

function showPosition(position) {
  let apiKey = "89c9ecbba6dfb51142563de590c487ba";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function searchCity(city) {
  let apiKey = "89c9ecbba6dfb51142563de590c487ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let searchForm = document.querySelector("#city");
searchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector(".cur");
button.addEventListener = ("click", getPosition);
