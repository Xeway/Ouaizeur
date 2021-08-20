let buttonsScaleForecast = document.querySelector('#buttons-scale-forecast');
let forecastDivs = document.querySelectorAll('section .forecast');

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