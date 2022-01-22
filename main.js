const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const weatherDiv = document.getElementById("weather-display");

searchButton.addEventListener("click", () => {
  if (cityInput.value === "") {
    alert("Missing city name!");
  } else {
    refreshSpinner();
    const tempSelection = document.querySelector(".checkbox:checked");
    removeWeatherCard();
    getWeather(cityInput.value, tempSelection.value)
      .then((result) => createWeatherCard(result, tempSelection.value))
      .catch((error) => alert("Couldn't fetch the API!", error));
  }
});

async function getWeather(city, temperature) {
  try {
    const getApi = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${temperature}&appid=cad0610116d54da5c37d79b27bdee371`,
      { mode: "cors" }
    );
    const weatherData = await getApi.json();
    return weatherData;
  } catch (error) {
    refreshSpinner();
    alert("Couldn't fetch the API", error);
  }
}

function createWeatherCard(city, temp) {
  const temperatureType = checkTemp(temp);
  const weatherContainer = document.createElement("div");
  weatherContainer.id = "weather-container";
  const cityName = document.createElement("h2");
  const temperature = document.createElement("h3");
  const minMaxTemperature = document.createElement("h3");
  const humidity = document.createElement("h3");
  const description = document.createElement("h3");
  const icon = document.createElement("img");
  cityName.textContent = city.name;
  temperature.textContent = `Temperature: ${city.main.temp}°${temperatureType}`;
  minMaxTemperature.textContent = `Min: ${city.main.temp_min}°${temperatureType} / Max: ${city.main.temp_max}°${temperatureType}`;
  humidity.textContent = `Humidity: ${city.main.humidity}%`;
  description.textContent = capitalizeFirstLetter(
    `"${city.weather[0].description}"`
  );
  icon.src = `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;
  weatherContainer.appendChild(cityName);
  weatherContainer.appendChild(icon);
  weatherContainer.appendChild(description);
  weatherContainer.appendChild(temperature);
  weatherContainer.appendChild(minMaxTemperature);
  weatherContainer.appendChild(humidity);
  refreshSpinner();
  weatherDiv.appendChild(weatherContainer);
}

function removeWeatherCard() {
  const weatherContainer = document.getElementById("weather-container");
  if (document.contains(weatherContainer)) {
    weatherDiv.removeChild(weatherContainer);
  }
}

function capitalizeFirstLetter(string) {
  let firstLetter = string.charAt(1);
  let firstLetterUpper = firstLetter.toUpperCase();
  let stringWhitoutFirstLetter = string.slice(2);
  return `"${firstLetterUpper}${stringWhitoutFirstLetter}`;
}

function checkTemp(temp) {
  if (temp === "imperial") {
    return "F";
  } else {
    return "C";
  }
}

function refreshSpinner() {
  weatherDiv.classList.contains("spin")
    ? weatherDiv.classList.remove("spin")
    : weatherDiv.classList.add("spin");
}
