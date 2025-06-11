document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('city-input');
  const getWeatherBtn = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById('weather-info');
  const cityName = document.getElementById('city-name');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');
  const errorMessage = document.getElementById('error-message');
  const weatherGif = document.getElementById('weather-gif');

  const API_key = "75a913caa1d2ae615b78d8bf9c474abc";

  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (city === "") return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
      errorMessage.classList.add('hidden');
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(weatherData) {
    cityName.innerHTML = `City: ${weatherData.name.charAt(0).toUpperCase() + weatherData.name.slice(1)}`;
    temperature.innerHTML = `Temperature: ${weatherData.main.temp}&deg;C`;
    description.innerHTML = `Description: ${weatherData.weather[0].description}`;
    weatherGif.src = getGifForCondition(weatherData.weather[0].main);
    weatherInfo.classList.remove('hidden');
    cityInput.value = "";
  }

  function getGifForCondition(condition) {
    const gifs = {
      Clear: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3BsY285NXYzYWI3dGY3amI5ZjV5djFjNXNzM2hieGo1eHNkMDFuYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oz8xwT20ApeHadTlS/giphy.gif",
      Clouds: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZia2gzeWZjMnVsM3dybXY4YXloODU3ZXFrbzNnazJwbGMzbjJ0diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oEdvbelTmMXOQ9VDO/giphy.gif",
      Rain: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MmoyNHhsOGRwN2RyNDV3dGw1Z3Y2Mnpwbzk2eDlwZmxybWxrcGxtZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3og0IOUWB5AZoP6la0/giphy.gif",
      Snow: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDZ0aGw3ZmFxb2x3czl6bjZlOTZ1OTNtdjlscHIyc2c5NWp3NjZtcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aZG8pgRzpXlp6/giphy.gif",
      Thunderstorm: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHIyNzdiNnlyeXA4NHhkMDExdG9vejN5Mmp6dTV2MWQwZ3NkcDNmNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3osxYzIQRqN4DOEddC/giphy.gif",
      Drizzle: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTB0ODdyN3ZwNnFqMTRmdXo2N3cyYWJrZWFlN291M2Z4YXU0ajRzZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lQU1BYYxavCPkPiWiT/giphy.gif",
      Mist: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmU5dnd1YnI4dW44YjVtaWNqbmx0dmJzaGNwaGltdDFsbjJ6NXhkNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yhZr5Wx7CBFbq/giphy.gif"
    };
    return gifs[condition] || "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif";
  }

  function showError() {
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
  }
});
