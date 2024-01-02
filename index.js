const apikey = "1d340e2d223acf7fc1dd4ec1a6ae49f9";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&APPID=${apikey}&units=metric`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}% `,
            `Wind speed: ${data.wind.speed}m/s`,
        ];

        weatherDataEl.querySelector(
            ".icon"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">`;
        weatherDataEl.querySelector(
            ".temperature"
        ).textContent = `${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent = description;

        weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`)
            .join("");

    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "An Error Happend, please try Again";
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}