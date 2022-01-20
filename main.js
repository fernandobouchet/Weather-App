const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const weatherDiv = document.getElementById("weather-display");

searchButton.addEventListener("click", () => {
  removeWeatherCard();
  getWeather(cityInput.value).then((result) => createWeatherCard(result));
});

async function getWeather(city) {
  try {
    const getApi = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cad0610116d54da5c37d79b27bdee371`,
      { mode: "cors" }
    );
    const weatherData = await getApi.json();
    return weatherData;
  } catch (error) {
    alert("error");
  }
}

function createWeatherCard(city) {
  const weatherContainer = document.createElement("div");
  weatherContainer.id = "weather-container";
  const cityName = document.createElement("h2");
  const temperature = document.createElement("h3");
  const feelsLikeTemperature = document.createElement("h3");
  const minTemperature = document.createElement("h3");
  const maxTemperature = document.createElement("h3");
  const humidity = document.createElement("h3");
  const description = document.createElement("h3");
  const icon = document.createElement("img");
  cityName.textContent = city.name;
  temperature.textContent = `Temperature: ${city.main.temp}°C`;
  feelsLikeTemperature.textContent = `Feels like: ${city.main.feels_like}°C`;
  minTemperature.textContent = `Min: ${city.main.temp_min}°C`;
  maxTemperature.textContent = `Max: ${city.main.temp_max}°C`;
  humidity.textContent = `Humidity: ${city.main.humidity}%`;
  //  windSpeed.textContent = `Wind speed : ${city.wind.speed}`;
  description.textContent = `"${city.weather[0].description}"`;
  icon.src = `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;
  weatherContainer.appendChild(cityName);
  weatherContainer.appendChild(icon);
  weatherContainer.appendChild(description);
  weatherContainer.appendChild(temperature);
  weatherContainer.appendChild(feelsLikeTemperature);
  weatherContainer.appendChild(minTemperature);
  weatherContainer.appendChild(maxTemperature);
  weatherContainer.appendChild(humidity);
  weatherDiv.appendChild(weatherContainer);
}

function removeWeatherCard() {
  const weatherContainer = document.getElementById("weather-container");
  if (document.contains(weatherContainer)) {
    weatherDiv.removeChild(weatherContainer);
  }
}
