const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const weatherDiv = document.getElementById("weather-display");

searchButton.addEventListener("click", () => {
  getWeather(cityInput.value).then((result) => createWeatherCard(result));
});

async function getWeather(city) {
  const getApi = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cad0610116d54da5c37d79b27bdee371`,
    { mode: "cors" }
  );
  const weatherData = await getApi.json();
  console.log(weatherData);
  return weatherData;
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
  //  const windSpeed = document.createElement("h3");
  const main = document.createElement("h3");
  const description = document.createElement("h3");
  const icon = document.createElement("img");
  cityName.textContent = city.name;
  temperature.textContent = `Temperature: ${city.main.temp}`;
  feelsLikeTemperature.textContent = `Feels like: ${city.main.feels_like}`;
  minTemperature.textContent = `Min: ${city.main.temp_min}`;
  maxTemperature.textContent = `Max: ${city.main.temp_max}`;
  humidity.textContent = `Humidity: ${city.main.humidity}%`;
  //  windSpeed.textContent = `Wind speed : ${city.wind.speed}`;
  main.textContent = `Main: ${city.weather[0].main}`;
  description.textContent = `Description: ${city.weather[0].description}`;
  icon.src = `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;
  weatherContainer.appendChild(cityName);
  weatherContainer.appendChild(main);
  weatherContainer.appendChild(description);
  weatherContainer.appendChild(temperature);
  weatherContainer.appendChild(feelsLikeTemperature);
  weatherContainer.appendChild(minTemperature);
  weatherContainer.appendChild(maxTemperature);
  weatherContainer.appendChild(humidity);
  //  weatherContainer.appendChild(windSpeed);
  weatherContainer.appendChild(icon);
  weatherDiv.appendChild(weatherContainer);
}
