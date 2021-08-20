const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
let languages = require("./public/js/translation.js");

app.set('views', "./views");
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.static("public"));
app.use('/css', express.static(__dirname + "public/css"));
app.use('/js', express.static(__dirname + "public/js"));
app.use('/src', express.static(__dirname + "public/src"));

app.get("/", (request, response) => { // check cookies at the root page
    if(request.cookies.language === "en") {
        response.redirect("/en");
    } else if(request.cookies.language === "fr") {
        response.redirect("/fr");
    } else {
        response.redirect("/en");
    }
});

app.get("/:lang", (request, response) => {

    if(request.params.lang === "fr" || request.params.lang === "en") {
        response.cookie("language", request.params.lang, {maxAge: 365*24*3600*1000});
    }
    console.log(request.cookies.language);

    if(request.params.lang === "fr") {
        response.render("index.ejs", {
            title: languages.french.title,
            slogan: languages.french.slogan,
            input: languages.french.input,
            button: languages.french.button,
            weatherLocation: languages.french.weatherLocation,
            weatherHour: languages.french.weatherHour,
            currently: languages.french.buttons.currently,
            today: languages.french.buttons.today,
            tomorrow: languages.french.buttons.tomorrow,
            dayAfterTomorrow: languages.french.buttons.dayAfterTomorrow
        });
    } else if(request.params.lang === "en") {
        response.render("index.ejs", {
            title: languages.english.title,
            slogan: languages.english.slogan,
            input: languages.english.input,
            button: languages.english.button,
            weatherLocation: languages.english.weatherLocation,
            weatherHour: languages.english.weatherHour,
            currently: languages.english.buttons.currently,
            today: languages.english.buttons.today,
            tomorrow: languages.english.buttons.tomorrow,
            dayAfterTomorrow: languages.english.buttons.dayAfterTomorrow
        });
    } else if(request.params.lang !== "fr" && request.params.lang !== "en") {
        response.redirect("/en");
    }
    
});

app.listen(process.env.PORT || 8080);