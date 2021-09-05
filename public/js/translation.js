let french = {
    language: "fr",
    description: "Ouaizeur : l'app météo conviviale, fun et open-source.",
    title: "Ouaizeur",
    input:  "Nom de ton bled",
    button: "Zééé partiii",
    weatherLocation: "Météo à ",
    weatherHour: "Dernière actualisation : ",
    buttons: {
        currently: "Actuellement",
        today: "Aujourd'hui",
        tomorrow: "Demain",
        dayAfterTomorrow: "Après-demain"
    },
    titleFooter: "Ce site est open-source, n'hésitez pas à l'améliorer !",
    descriptionInstall: "Téléchargez l'app.",
    installButton: "Installer"
};

let english = {
    language: "en",
    description: "Ouaizeur: a UI/UX friendly, fun and open-source weather app.",
    title: "Ouaizeur",
    input:  "Name of your town",
    button: "Let's gooo",
    weatherLocation: "Weather in ",
    weatherHour: "Last update: ",
    buttons: {
        currently: "Currently",
        today: "Today",
        tomorrow: "Tomorrow",
        dayAfterTomorrow: "The day after tomorrow"
    },
    titleFooter: "This website is open-source, feel free to improve it!",
    descriptionInstall: "Get the free app.",
    installButton: "Install"
};

let quotes = {
    french: [
        "\"La seule météo 100% fiable est celle de la veille.\" - Pellegrino Soricelli",
        "\"Qui écoute trop la météo, passe sa vie au bistrot.\" - Proverbe Breton",
        "\"Quiconque dit que le soleil apporte le bonheur n'a jamais dansé sous la pluie.\" - ",
        "\"Quand il fait chaud, garde l'esprit frais. Quand il fait froid, garde un cœur chaud.\" - Ajahn Brahm",
        "\"Il n'y a pas de mauvais temps, seulement des vêtements inappropriés.\" - Sir Ranulph Fiennes",
        "\"L'hiver britannique : se termine en juillet, pour reprendre en août.\" - Lord Byron",
        "\"La gentillesse est comme la neige. Elle embellit tout ce qu'elle recouvre.\" - Kahlil Gibran",
        "\"La vie ne consiste pas à attendre que l'orage passe, mais à apprendre à danser sous la pluie.\" - ",
        "\"Où que tu vas, quel que soit le temps, apporte toujours ton propre rayon de soleil.\" - Anthony J. D'Angelo",
        "\"Les gens ne remarquent pas si c'est l'hiver ou l'été quand ils sont heureux.\" - Anton Chekhov",
        "\"L'hiver est une gravure, le printemps une aquarelle, l'été une peinture et l'automne une mosaïque de tous ces éléments.\" - Stanley Horowitz",
        "\"S'intéresser au changement des saisons est un état d'esprit plus heureux que d'être désespérément amoureux du printemps.\" - George Santayana",
        "\"L'hiver n'est pas une saison, c'est une fête.\" - Anamika Mishra",
        "\"Certaines personnes marchent sous la pluie, d'autres sont juste mouillées.\" - Roger Miller"
    ],
    english: [
        "\"The only 100% reliable weather forecast is the one from the day before.\" - Pellegrino Soricelli",
        "\"Who listens too much to the weather, spends his life in the pub.\" - Breton proverb",
        "\"Anyone who says sunshine brings happiness has never danced in the rain.\" - ",
        "\"When the weather is hot, keep a cool mind. When the weather is cold, keep a warm heart.\" - Ajahn Brahm",
        "\"There's no such thing as bad weather, only inappropriate clothing.\" - Sir Ranulph Fiennes",
        "\"The english winter: ending in July, to recommence in August.\" - Lord Byron",
        "\"Kindness is like snow. It beautifies everything it covers.\" - Kahlil Gibran",
        "\"Life isn't about waiting for the storm to pass, it's about learning to dance in the rain.\" - ",
        "\"Wherever you go, no matter what the weather, always bring your own sunshine.\" - Anthony J. D'Angelo",
        "\"People don’t notice whether it’s winter or summer when they’re happy.\" - Anton Chekhov",
        "\"Winter is an etching, spring a watercolor, summer a painting, and autumn a mosaic of them all.\" - Stanley Horowitz",
        "\"To be interested in the changing seasons is a happier state of mind than to be hopelessly in love with spring.\" - George Santayana",
        "\"Winter is not a season, it’s a celebration.\" - Anamika Mishra",
        "\"Some people walk in the rain, others just get wet.\" - Roger Miller"
    ]
}

function randomQuote() {
    return Math.floor(Math.random() * quotes.french.length);
}

module.exports = {
    french,
    english,
    quotes,
    randomQuote
};