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
if (minute < 10) {
  minute = `0${minute}`
}
date.innerHTML = `${day} ${hour}:${minute}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML = forecastHTML +
      `<div class="col">
                <div class="box">
                    ${day}
                    <br />
                    <i class="fa-solid fa-cloud-sun cloud"></i>
                    <br />
                    <span>32°</span> <span class="night">19°</span>
                </div>
            </div>`;
  })
 forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=89c9ecbba6dfb51142563de590c487ba&units=metric`;
  console.log(apiUrl)
}
      
function showCurrentCity() {
  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    function showCurrentWeather(response) {
      let city = document.querySelector("#place");
      city.textContent = response.data.name;     
      
      getForecast(response.data.coord)

      let cel = document.querySelector("#celsius");
      let fahren = document.querySelector("#fahren");
      let temperature = document.querySelector("#num");
      temperature.textContent = Math.round(response.data.main.temp);

      function showTempC(event) {
        event.preventDefault();
        temperature.textContent = Math.round(response.data.main.temp);
      }

      function showTempF(event) {
        event.preventDefault();
        temperature.textContent = Math.round(
          response.data.main.temp * 1.8 + 32
        );
      }

      let humidity = document.querySelector("#hum");
      let wind = document.querySelector("#wind");
      let description = document.querySelector("#des");
      description.innerHTML = response.data.weather[0].description;
      wind.innerHTML = Math.round(response.data.wind.speed);
      humidity.innerHTML = response.data.main.humidity;

      cel.addEventListener("click", showTempC);
      fahren.addEventListener("click", showTempF);
    }
    let apiKey = "89c9ecbba6dfb51142563de590c487ba";
    const searchUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(searchUrl).then(showCurrentWeather);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
  
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=89c9ecbba6dfb51142563de590c487ba&units=metric`;
  console.log(apiUrl)
}

function showCity(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#search-input");
  let city = document.querySelector("#place");
  let town = cityInput.value;
  city.textContent = town;

  function showWeather(response) {
    let cel = document.querySelector("#celsius");
    let faren = document.querySelector("#fahren");
    let temperature = document.querySelector("#num");
    temperature.textContent = Math.round(response.data.main.temp);

    getForecast(response.data.coord)

    let humidity = document.querySelector("#hum");
      let wind = document.querySelector("#wind");
      let description = document.querySelector("#des");
      description.innerHTML = response.data.weather[0].description;
      wind.innerHTML = Math.round(response.data.wind.speed);
    humidity.innerHTML = response.data.main.humidity;

    function showTempC(event) {
      event.preventDefault();
      temperature.textContent = Math.round(response.data.main.temp);
    }

     function showTempF(event) {
        event.preventDefault();
        temperature.textContent = Math.round(
          response.data.main.temp * 1.8 + 32
        );
    }

    cel.addEventListener("click", showTempC);
    faren.addEventListener("click", showTempF);
  }
  let apiKey = "89c9ecbba6dfb51142563de590c487ba";
  const searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${apiKey}&units=metric`;
  axios.get(searchUrl).then(showWeather);
}

let searchCity = document.querySelector("#city-btn");
searchCity.addEventListener("click", showCity);


let currentCity = document.querySelector("#cur");
currentCity.addEventListener("click", showCurrentCity);
displayForecast();