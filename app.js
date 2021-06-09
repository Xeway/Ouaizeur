let button = document.querySelector('#button');

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