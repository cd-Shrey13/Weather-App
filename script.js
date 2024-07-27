const getWeatherBtn = document.getElementById("getWeatherBtn");
const inputBox = document.getElementById("citynameBox");
const weatherImage = document.getElementById("weather_image");
const weatherInfoBox = document.getElementById("weather_info");
const key = (API_KEY = "d3fbdf9a29ec49af7e14d903b2af398a");

document.getElementById("main").style.visibility = `hidden`;

getWeatherBtn.addEventListener("click", async () => {
  const latlong = await getLatLong();
  const weatherData = await getWeather(latlong);
  document.getElementById("main").style.visibility = `visible`;
  setWeatherImage(weatherData);
  setWeahterInfo(weatherData);
});

async function getLatLong() {
  const geodesicAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${inputBox.value}&appid=${key}`;
  try {
    const response = await fetch(geodesicAPI, {
      method: "GET",
    });
    const data = await response.json();
    const lat = data[0].lat;
    const longitude = data[0].lon;
    return { lat, longitude };
  } catch (error) {
    alert("Enter a valid city name!");
  }
}

async function getWeather(latlong) {
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latlong.lat}&lon=${latlong.longitude}&appid=${key}`;

  const response = await fetch(weatherAPI, { method: "GET" });
  const data = await response.json();
  return data;
}

function setWeatherImage(weatherData) {
  const imageName = weatherData.weather[0].icon;
  weatherImage.src = `svg/${imageName}.svg`;
}

function setWeahterInfo(weatherData) {
  document.getElementById(
    "weather"
  ).innerHTML = `${weatherData.weather[0].main}`;
  document.getElementById("temperature").innerHTML = `${(
    weatherData.main.temp - 273.15
  ).toFixed(0)}°C`;
  document.getElementById(
    "windspeed"
  ).innerHTML = `${weatherData.wind.speed}km/h`;
  document.getElementById(
    "humidity"
  ).innerHTML = `${weatherData.main.humidity}%`;
  document.getElementById("location").innerHTML = `${inputBox.value}`;
}
