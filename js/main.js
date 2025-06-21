let Today = document.getElementById("todayCard");
let Tomorrow = document.getElementById("tomorrowCard");
let afterTomorrow = document.getElementById("afterTomorrowCard");
let Input = document.getElementById("locationInput");
let SearchBtn = document.getElementById("searchBtn");

let currentDate = new Date();
// console.log(Date.prototype);
let day = currentDate.getDay();
let month = currentDate.getMonth();
let year = currentDate.getFullYear();
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// let date = `${days[day]}, ${months[month]} ${currentDate.getDate()}, ${year}`;
// console.log(year);

async function getWeatherData(city){
    const data = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=f02ec07d8a904f6ab84201742252006&q=${city? city : 'cairo'}&days=3&aqi=no&alerts=no`
    );
    const weatherData = await data.json();
    await todayWeatherDisplay(weatherData);
    await tomorrowWeatherDisplay(weatherData);
    await afterTomorrowWeatherDisplay(weatherData);
}
getWeatherData();

async function todayWeatherDisplay(city) {
    let cardBox =''
    cardBox += `
                <div class="card" style="width: 18rem;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between align-items-center today-header"><h5 class="card-title">${
                          days[day]
                        }</h5> <h5>${currentDate.getDate()} ${
      months[month]
    }</h5></li>
    <li class="list-group-item">
                            <div class="cardImg d-flex justify-content-center align-items-center w-100">
                                <img class="img-fluid" src="https:${city.current.condition.icon}" alt="">
                            </div>
                            <div class="card-body">
                            <h6 class="card-subtitle mb-4">${city.location.name}, ${city.location.country}</h6>
                            <h2 class="card-title mb-4">${city.current.temp_c}°C</h2>
                            <p class="card-text">${city.current.condition.text}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-drizzle-fill" viewBox="0 0 16 16">
                            <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973"/><span> ${city.forecast.forecastday[0].day.daily_chance_of_rain}%</span></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                            <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/> <span> ${city.current.wind_kph} km/h</span></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-compass-fill 	 " viewBox="0 0 16 16">
                            <path d="M15.5 8.516a7.5 7.5 0 1 1-9.462-7.24A1 1 0 0 1 7 0h2a1 1 0 0 1 .962 1.276 7.5 7.5 0 0 1 5.538 7.24m-3.61-3.905L6.94 7.439 4.11 12.39l4.95-2.828 2.828-4.95z"/><span> ${city.current.wind_dir}</span></svg>
                        </div>
                        </li>
                    </ul>
            </div>
    `;
    Today.innerHTML = cardBox;
}

async function tomorrowWeatherDisplay(city) {
    let cardBox = '';
    cardBox += `<div class="card" style="width: 18rem;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item tomorrow-header"><h5 class="card-title">${days[(day + 1) % 7]}</h5></li>
                        <li class="list-group-item">
                            <div class="cardImg d-flex justify-content-center align-items-center w-100">
                                <img class="img-fluid" src="https:${city.forecast.forecastday[1].day.condition.icon}" alt="">
                            </div>
                            <div class="card-body">
                            <h6 class="card-subtitle mb-4 text-muted">${city.location.name}, ${city.location.country}</h6>
                            <h2 class="card-title mb-4">${
                              city.forecast.forecastday[1].day.maxtemp_c
                            }°C</h2>
                            <p class="card-text">${
                              city.forecast.forecastday[1].day.mintemp_c
                            }°C</p>
                            <p class="card-text">${
                              city.forecast.forecastday[1].day.condition.text
                            }</p>
                          </div>
                        </li>
                      </ul>
              </div>`;
    Tomorrow.innerHTML = cardBox;
}

async function afterTomorrowWeatherDisplay(city) {
    let cardBox = '';
    cardBox += `<div class="card" style="width: 18rem;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item afterTomorrow-header"><h5 class="card-title">${
                          days[(day + 2) % 7]
                        }</h5></li>
                        <li class="list-group-item">
                            <div class="cardImg d-flex justify-content-center align-items-center w-100">
                                <img class="img-fluid" src="https:${
                                  city.forecast.forecastday[2].day.condition.icon
                                }" alt="">
                            </div>
                            <div class="card-body">
                            <h6 class="card-subtitle mb-4 text-muted">${city.location.name}, ${city.location.country}</h6>
                            <h2 class="card-title mb-4">${city.forecast.forecastday[2].day.maxtemp_c}°C</h2>
                            <p class="card-text">${city.forecast.forecastday[2].day.mintemp_c}°C</p>
                            <p class="card-text">${
                              city.forecast.forecastday[2].day.condition.text
                            }</p>
                            </div>
                        </li>
                      </ul>
              </div>`;
    afterTomorrow.innerHTML = cardBox;
}

SearchBtn.addEventListener("click", function() {
    let city = Input.value;
    getWeatherData(city);
});
Input.addEventListener("input", function(event) {
        let city = Input.value;
        getWeatherData(city)
});