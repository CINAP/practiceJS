import { config } from "./config.js";
const weatherKey = config.API_KEY;

const COORDS = `coards`;
const weather = document.querySelector(".js-weather");

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude, longitude);
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  callApi(latitude, longitude);
}

function handleGeoError() {
  console.log("Error Occurred");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError);
}

function callApi(lat, lnt) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lnt}&appid=${weatherKey}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const temperature = Math.floor(json.main.temp);
      const place = json.name;
      const sky = json.weather[0].main;
      let dayWeather;
      switch (sky) {
        case "Clouds":
          dayWeather = "구름 ☁";
          break;
        case "Wind":
          dayWeather = "바람 🌫";
          break;
        case "Rain":
          dayWeather = "비 🌧";
          break;
        case "Snow":
          dayWeather = "눈 ❄";
          break;
        default:
          dayWeather = sky;
      }
      weather.innerText = `현재 기온 : ${temperature}℃\n날씨 : ${dayWeather} \n위치 : ${place}`;
    });
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  console.log(loadedCoords);
  if (!loadedCoords) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    callApi(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
