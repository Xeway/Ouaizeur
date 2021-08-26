let button = document.querySelector('#button');
let city = document.querySelector('#city-name');
let error = document.querySelector('aside');
let currentWeather = document.querySelector('#current-weather');
let todayWeather = document.querySelector('#today-weather');
let tomorrowWeather = document.querySelector('#tomorrow-weather');
let afterTomorrowWeather = document.querySelector('#after-tomorrow-weather');
let weatherBoxesToday = document.querySelector("#weather-boxes-today");
let startHour;
let loaderApi = document.querySelector("#loader-api");
let valueButton;

button.addEventListener('mouseover', (e) => {
    valueButton = e.target.textContent;
    e.target.textContent = "👀☀️☁️🌪️❄️💨🌧️🌈👀";
});

button.addEventListener('mouseout', (e) => {
    e.target.textContent = valueButton;
});

button.addEventListener('click', (e) => {
    e.preventDefault();
    loaderApi.style.visibility = "visible";

    let cityName = city.value.normalize('NFD').replace(/\s/g , "-").replace(/[\u0300-\u036f]/g, "").replace(/[0-9]/g, '').toLowerCase();
    
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=de55c2820a014a8a9eb91410212408&lang=${language}&days=3&q=${cityName}/`)
        .then((res) => {
            if(res.ok) {
                error.style.display = "none";
                return res.json();
            }
        })
        .then((value) => {
            document.querySelector('section').style.display = "block";
            let date = new Date().getHours() + ":00";
            let lastUpdatedDate = (((new Date(value.current.last_updated).getHours() < 10) ? '0' : '') + new Date(value.current.last_updated).getHours())  + ":" + (((new Date(value.current.last_updated).getMinutes() < 10) ? '0' : '') + new Date(value.current.last_updated).getMinutes());

            document.querySelector("#name-city-span").innerHTML = value.location.name + ", " + value.location.region + ", " + value.location.country;
            document.querySelector('#current-hour-span').innerHTML = lastUpdatedDate;

            loaderApi.style.visibility = "hidden";

            currentWeather.children[0].setAttribute("src", value.current.condition.icon);
            currentWeather.children[1].innerHTML = value.current.condition.text;
            currentWeather.children[2].children[0].innerHTML = "Température : " + value.current.temp_c + "°C";
            currentWeather.children[2].children[1].innerHTML = "Ressenti : " + value.current.feelslike_c + "°C";

            let month = new Date(value.current.last_updated);
            month.setMonth(month.getMonth() + 1);

            let fullDate = new Date(value.current.last_updated).getFullYear() + "-" + (((month.getMonth() < 10) ? '0' : '') + month.getMonth()) + "-" + (((new Date(value.current.last_updated).getDate() < 10) ? '0' : '') + new Date(value.current.last_updated).getDate()) + " " + (((new Date(value.current.last_updated).getHours() < 10) ? '0' : '') + new Date(value.current.last_updated).getHours())  + ":00";
            
            for(let j = 0 ; j < value.forecast.forecastday[0].hour.length ; j++) {
                if(value.forecast.forecastday[0].hour[j].time == fullDate) {
                    startHour = value.forecast.forecastday[0].hour[j];
                }
            }

            startHour = new Date(startHour.time).getHours();
            
            todayWeather.children[0].innerHTML = value.forecast.forecastday[0].day.condition.text;
            tomorrowWeather.children[0].innerHTML = value.forecast.forecastday[1].day.condition.text;
            afterTomorrowWeather.children[0].innerHTML = value.forecast.forecastday[2].day.condition.text;

            let hoursArray = [];
            for(let k = 0, m = 0 ; k < value.forecast.forecastday[0].hour.length ; k++, m += 3) {
                if(startHour + m < value.forecast.forecastday[0].hour.length && todayWeather.children[1].children[k] != undefined) {
                    todayWeather.children[1].children[k].children[0].innerHTML = new Date(value.forecast.forecastday[0].hour[startHour + m].time).getHours() + ":00";
                    todayWeather.children[1].children[k].children[1].setAttribute("src", value.forecast.forecastday[0].hour[startHour + m].condition.icon);
                    todayWeather.children[1].children[k].children[2].innerHTML = value.forecast.forecastday[0].hour[startHour + m].temp_c + "°C";
                    hoursArray.push(startHour + m);
                }
            }

            let lastHour = hoursArray[hoursArray.length - 1];

            let startTomorrowHour = (lastHour + 3) - 24;

            for(let r = 0 ; r < weatherBoxesToday.children.length ; r++) {
                if(weatherBoxesToday.children[r].children[0].textContent === "" && weatherBoxesToday.children[r].children[1].currentSrc === "" && weatherBoxesToday.children[r].children[2].textContent === "") {
                    if(value.forecast.forecastday[1].hour[startTomorrowHour] != undefined) {
                        todayWeather.children[1].children[r].children[0].innerHTML = new Date(value.forecast.forecastday[1].hour[startTomorrowHour].time).getHours() + ":00";
                        todayWeather.children[1].children[r].children[1].setAttribute("src", value.forecast.forecastday[1].hour[startTomorrowHour].condition.icon);
                        todayWeather.children[1].children[r].children[2].innerHTML = value.forecast.forecastday[1].hour[startTomorrowHour].temp_c + "°C";
                        startTomorrowHour += 3;
                    }
                }
            }

            for(let n = 1 ; n < value.forecast.forecastday.length ; n++) {
                for(let p = 0, q = 0 ; p < value.forecast.forecastday[n].hour.length ; p += 3, q++) {
                    if(n == 1) {
                        tomorrowWeather.children[1].children[q].children[0].innerHTML = new Date(value.forecast.forecastday[n].hour[p].time).getHours() + ":00";
                        tomorrowWeather.children[1].children[q].children[1].setAttribute("src", value.forecast.forecastday[n].hour[p].condition.icon);
                        tomorrowWeather.children[1].children[q].children[2].innerHTML = value.forecast.forecastday[n].hour[p].temp_c + "°C";
                    } else if (n == 2) {
                        afterTomorrowWeather.children[1].children[q].children[0].innerHTML = new Date(value.forecast.forecastday[n].hour[p].time).getHours() + ":00";
                        afterTomorrowWeather.children[1].children[q].children[1].setAttribute("src", value.forecast.forecastday[n].hour[p].condition.icon);
                        afterTomorrowWeather.children[1].children[q].children[2].innerHTML = value.forecast.forecastday[n].hour[p].temp_c + "°C";
                    }
                }
            }

        })
        .catch((err) => {
            document.querySelector('section').style.display = "none";
            loaderApi.style.visibility = "hidden";
            error.style.display = "flex";
            if(language === "fr") {
                error.children[0].innerHTML = `Oups... Il y a eu un problème pour receuillir les données...<br>-<br>Es-tu sûr d'avoir bien écris le nom de la ville ? Sinon, n'hésite pas à contacter l'admin du site`;
            } else {
                error.children[0].innerHTML = `Oops... Something went wrong to fetch the data...<br>-<br>Are you sure to have correctly written the name of the city? Otherwise, feel free to contact the website administrator`;
            }
        });
});