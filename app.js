let button = document.querySelector('#button');
let city = document.querySelector('#city-name');
let error = document.querySelector('#error');
let currentWeather = document.querySelector('#current-weather');
let todayWeather = document.querySelector('#today-weather');
let tomorrowWeather = document.querySelector('#tomorrow-weather');
let afterTomorrowWeather = document.querySelector('#after-tomorrow-weather');
let buttonsScaleForecast = document.querySelector('#buttons-scale-forecast');
let forecastDivs = document.querySelectorAll('section .forecast');
let startHour;

button.addEventListener('mouseover', (e) => {
    if(e.target.textContent == "Zééé partiii") {
        e.target.textContent = "👀☀️☁️🌪️❄️💨🌧️🌈👀";
    };
});

button.addEventListener('mouseout', (e) => {
    if(e.target.textContent == "👀☀️☁️🌪️❄️💨🌧️🌈👀") {
        e.target.textContent = "Zééé partiii";
    }
});

button.addEventListener('click', (e) => {
    let cityName = city.value.normalize('NFD').replace(/\s/g , "-").replace(/[\u0300-\u036f]/g, "").replace(/[0-9]/g, '').toLowerCase();
    
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=4ae32182d907474e93895631210706&lang=fr&days=3&q=${cityName}/`)
        .then((res) => {
            if(res.ok) {
                error.style.display = "none";
                return res.json();
            } else {
                throw new Error("Une erreur est survenue, n'hésite pas à contacter l'administrateur du site");
            }
        })
        .then((value) => {
            document.querySelector('section').style.display = "block";
            console.log(value);
            let date = new Date().getHours() + ":00";
            let lastUpdatedDate = (((new Date(value.current.last_updated).getHours() < 10) ? '0' : '') + new Date(value.current.last_updated).getHours())  + ":" + (((new Date(value.current.last_updated).getMinutes() < 10) ? '0' : '') + new Date(value.current.last_updated).getMinutes());

            document.querySelector("#name-city").innerHTML = "Météo à " + value.location.name + ", " + value.location.region + ", " + value.location.country;
            document.querySelector('#current-hour').innerHTML = "Dernière actualisation : " + lastUpdatedDate;

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
            
            for(let k = 1 ; k < value.forecast.forecastday[0].hour.length ; k++) {
                let l = k - 1;
                //console.log(l);
                while(startHour + l < value.forecast.forecastday[0].hour.length) {
                    while(todayWeather.children[k] != undefined) {
                        todayWeather.children[k].children[0].innerHTML = new Date(value.forecast.forecastday[0].hour[startHour + l].time).getHours();
                    }
                }
            }

        })
        .catch((err) => {
            document.querySelector("#name-city").innerHTML = "";
            error.style.display = "block";
            error.innerHTML = `Oups... Il y a eu un problème pour receuillir les données : ${err}`;
        })
});

for(let i = 0 ; i < buttonsScaleForecast.children.length ; i++) {

    buttonsScaleForecast.children[i].addEventListener('click', (e) => {

        e.preventDefault();

        document.querySelectorAll("#buttons-scale-forecast a").forEach((btn) => {
            btn.classList.remove("active-button-scale-forecast");
        });

        forecastDivs.forEach((div) => {
            div.style.display = "none";
        });
        
        if(!e.target.classList.contains("active-button-scale-forecast")) {
            e.target.classList.add('active-button-scale-forecast');
        }

        forecastDivs.forEach((div) => {
            div.classList.remove('active');
        });

        if(e.target.classList.contains("active-button-scale-forecast")) {
            let className = e.target.classList[0];
            let article = document.querySelector(`div.${className}`);
            article.style.display = "flex";
        }
    });
}