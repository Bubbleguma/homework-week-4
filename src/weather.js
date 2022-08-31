let date = document.querySelector("#date")
    let now = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[now.getDay()];
    let hour = now.getHours();
    let minute = now.getMinutes();
date.innerHTML = `${day} ${hour}:${minute}`


function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h4 = document.querySelector("h4");
  h4.innerHTML = `Searching for ${searchInput.value}...`;
}
let form = document.querySelector("#city");
form.addEventListener("submit", search);

let far = document.querySelector("#fahren")
far.addEventListener("click", change)
function change(event) {
    event.preventDefault();
    let link = document.querySelector("#num")
    link.innerHTML =`69.8`
}
let cel = document.querySelector("#celsius")
cel.addEventListener("click", chang)
function chang(event) {
    event.preventDefault();
    let lin = document.querySelector("#num")
    lin.innerHTML =`21`
}

function showPosition(position) {
  let apiKey = "89c9ecbba6dfb51142563de590c487ba";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(showPosition);

let button = document.querySelector(".cur")
button.addEventListener = ("click", response)

function showTemperature(response) {
    let city = response.data.name;
    let round = Math.round(response.data.main.temp);
    let h1 = document.querySelector("#h1");
    h1.innerHTML = `It is currently ${round}°C in ${city}.`;
}



