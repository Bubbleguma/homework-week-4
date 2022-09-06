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

function localValues(c) {
  let temperature = Math.round(c.data.main.temp);
  let changeTemp = document.querySelector("#temperatureToday");
  changeTemp.innerHTML = temperature;

  let city = c.data.name;
  let localCity = document.querySelector("#city");
  localCity.innerHTML = city;

  let sky = c.data.weather[0].description;
  sky = sky.charAt(0).toUpperCase() + sky.slice(1);
  let localSky = document.querySelector("#sky");
  localSky.innerHTML = sky;

  let humidity = c.data.main.humidity;
  let localHumidity = document.querySelector("#hum");
  localHumidity.innerHTML = humidity;

  let wind = Math.round(c.data.wind.speed);
  let localWind = document.querySelector("#wind");
  localWind.innerHTML = wind;
}

function emoji(c) {
  let sky = c.data.weather[0].main;
  let skyNow = document.querySelector(".emoji");
  if (sky === "Clear") {
    skyNow.innerHTML = "☀";
  } else if (sky === "Clouds") {
    skyNow.innerHTML = "🌤";
  } else if (sky === "Drizzle") {
    skyNow.innerHTML = "🌨";
  } else if (sky === "Rain") {
    skyNow.innerHTML = "🌧";
  } else if (sky === "Thunderstorm") {
    skyNow.innerHTML = "⚡️";
  } else if (sky === "Snow") {
    skyNow.innerHTML = "❄️";
  }
}

function showCity(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#search-input");
  let city = document.querySelector("#place");
  let town = cityInput.value;
  city.textContent = town;

  function showWeather(response) {
    let cel = document.querySelector("#celsius");
    let faren = document.querySelector("#faren");
    let temperature = document.querySelector("#num");
    temperature.textContent = Math.round(response.data.main.temp);

    function showTempC(event) {
      event.preventDefault();
      temperature.textContent = Math.round(response.data.main.temp);
    }

    function showTempF(event) {
      event.preventDefault();
      temperature.textContent = Math.round(response.data.main.temp * 1.8 + 32);
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

function showCurrentCity() {
  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    function showCurrentWeather(response) {
      let city = document.querySelector("#place");
      city.textContent = response.data.name;

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

      cel.addEventListener("click", showTempC);
      fahren.addEventListener("click", showTempF);
    }
    let apiKey = "89c9ecbba6dfb51142563de590c487ba";
    const searchUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(searchUrl).then(showCurrentWeather);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCity = document.querySelector("#cur");
currentCity.addEventListener("click", showCurrentCity);
