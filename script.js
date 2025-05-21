document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfoDiv = document.getElementById("weather-info");
  const locationElem = document.getElementById("location");
  const temperatureElem = document.getElementById("temperature");
  const descriptionElem = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (city === "") {
      alert("Please enter a city name.");
      return;
    }
    try {
      const weatherData = await fetchWeather(city);
      displayWeather(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeather(city) {
    const apiKey = CONFIG.WEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Weather data not found.");
    }
    return await response.json();
  }

  function displayWeather(data) {
    locationElem.textContent = `Location: ${data.name}, ${data.sys.country}`;
    temperatureElem.textContent = `Temperature: ${Math.round(data.main.temp - 273.15)}°C`;
    descriptionElem.textContent = `Description: ${data.weather[0].description}`;
    weatherInfoDiv.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfoDiv.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
