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

function listCookies() {
    let theCookies = document.cookie.split('; ');
    let cookiesArray = [];
    theCookies.forEach(theCookie => {
        cookiesArray.push(theCookie);
    });
    return cookiesArray;
}

function getCookieValue(cookie) {
    let cookieSplit = cookie.split("=");
    return cookieSplit[1];
}

function fillElements(data, isStringified) {
    if(isStringified) {
        data = JSON.parse(data);
    }
    
    let date = new Date(data.current.last_updated);

    let lastUpdatedDateFr = (((date.getDate() < 10) ? '0' : '') + date.getDate()) + "/" + ((((date.getMonth() + 1) < 10) ? '0' : '') + (date.getMonth() + 1)) + "/" + date.getFullYear() + " à " + (((date.getHours() < 10) ? '0' : '') + date.getHours())  + ":" + (((date.getMinutes() < 10) ? '0' : '') + date.getMinutes());
    let lastUpdatedDateEn = date.getFullYear() + "-" + ((((date.getMonth() + 1) < 10) ? '0' : '') + (date.getMonth() + 1)) + "-" + (((date.getDate() < 10) ? '0' : '') + date.getDate()) + " at " + (((date.getHours() < 10) ? '0' : '') + date.getHours())  + ":00";

    document.querySelector("#name-city-span").innerHTML = data.location.name + ", " + data.location.region + ", " + data.location.country;
    if(language === "fr") {
        document.querySelector('#current-hour-span').innerHTML = lastUpdatedDateFr;
    } else {
        document.querySelector('#current-hour-span').innerHTML = lastUpdatedDateEn;
    }

    loaderApi.style.visibility = "hidden";

    currentWeather.children[0].setAttribute("src", data.current.condition.icon);
    currentWeather.children[1].innerHTML = data.current.condition.text;
    currentWeather.children[2].children[0].innerHTML = "Température : " + data.current.temp_c + "°C";
    currentWeather.children[2].children[1].innerHTML = "Ressenti : " + data.current.feelslike_c + "°C";

    let fullDate = date.getFullYear() + "-" + ((((date.getMonth() + 1) < 10) ? '0' : '') + (date.getMonth() + 1)) + "-" + (((date.getDate() < 10) ? '0' : '') + date.getDate()) + " " + (((date.getHours() < 10) ? '0' : '') + date.getHours())  + ":00";
    for(let j = 0 ; j < data.forecast.forecastday[0].hour.length ; j++) {
        if(data.forecast.forecastday[0].hour[j].time == fullDate) {
            startHour = data.forecast.forecastday[0].hour[j];
        }
    }

    startHour = new Date(startHour.time).getHours();
    
    todayWeather.children[0].innerHTML = data.forecast.forecastday[0].day.condition.text;
    tomorrowWeather.children[0].innerHTML = data.forecast.forecastday[1].day.condition.text;
    afterTomorrowWeather.children[0].innerHTML = data.forecast.forecastday[2].day.condition.text;

    let hoursArray = [];
    for(let k = 0, m = 0 ; k < data.forecast.forecastday[0].hour.length ; k++, m += 3) {
        if(startHour + m < data.forecast.forecastday[0].hour.length && todayWeather.children[1].children[k] != undefined) {
            todayWeather.children[1].children[k].children[0].innerHTML = new Date(data.forecast.forecastday[0].hour[startHour + m].time).getHours() + ":00";
            todayWeather.children[1].children[k].children[1].setAttribute("src", data.forecast.forecastday[0].hour[startHour + m].condition.icon);
            todayWeather.children[1].children[k].children[2].innerHTML = data.forecast.forecastday[0].hour[startHour + m].temp_c + "°C";
            hoursArray.push(startHour + m);
        }
    }

    let lastHour = hoursArray[hoursArray.length - 1];

    let startTomorrowHour = (lastHour + 3) - 24;

    for(let r = 0 ; r < weatherBoxesToday.children.length ; r++) {
        if(weatherBoxesToday.children[r].children[0].textContent === "" && weatherBoxesToday.children[r].children[1].currentSrc === "" && weatherBoxesToday.children[r].children[2].textContent === "") {
            if(data.forecast.forecastday[1].hour[startTomorrowHour] != undefined) {
                todayWeather.children[1].children[r].children[0].innerHTML = new Date(data.forecast.forecastday[1].hour[startTomorrowHour].time).getHours() + ":00";
                todayWeather.children[1].children[r].children[1].setAttribute("src", data.forecast.forecastday[1].hour[startTomorrowHour].condition.icon);
                todayWeather.children[1].children[r].children[2].innerHTML = data.forecast.forecastday[1].hour[startTomorrowHour].temp_c + "°C";
                startTomorrowHour += 3;
            }
        }
    }

    for(let n = 1 ; n < data.forecast.forecastday.length ; n++) {
        for(let p = 0, q = 0 ; p < data.forecast.forecastday[n].hour.length ; p += 3, q++) {
            if(n == 1) {
                tomorrowWeather.children[1].children[q].children[0].innerHTML = new Date(data.forecast.forecastday[n].hour[p].time).getHours() + ":00";
                tomorrowWeather.children[1].children[q].children[1].setAttribute("src", data.forecast.forecastday[n].hour[p].condition.icon);
                tomorrowWeather.children[1].children[q].children[2].innerHTML = data.forecast.forecastday[n].hour[p].temp_c + "°C";
            } else if (n == 2) {
                afterTomorrowWeather.children[1].children[q].children[0].innerHTML = new Date(data.forecast.forecastday[n].hour[p].time).getHours() + ":00";
                afterTomorrowWeather.children[1].children[q].children[1].setAttribute("src", data.forecast.forecastday[n].hour[p].condition.icon);
                afterTomorrowWeather.children[1].children[q].children[2].innerHTML = data.forecast.forecastday[n].hour[p].temp_c + "°C";
            }
        }
    }
}

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
            document.cookie = `city=${city.value}; max-age=${365*24*3600}; samesite=strict`;
            localStorage.setItem("weather", JSON.stringify(value));
            document.querySelector('section').style.display = "block";
            fillElements(value, false);
        })
        .catch((err) => {
            document.cookie = "city=; max-age=0";
            localStorage.clear();
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

if(listCookies()[1] !== undefined) {
    city.value = getCookieValue(listCookies()[1]);
} else {
    city.value = "";
}

if(localStorage.getItem("weather") !== null) {
    document.querySelector('section').style.display = "block";
    fillElements(localStorage.getItem("weather"), true);
}