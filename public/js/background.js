let backgroundSize = document.querySelector('.additional-background');

let sizeTitleIllustration = document.querySelector('#title-illustration');

let marginHeader = document.querySelector('header');

function getMargin() {
    let sizeMargin = parseFloat(window.getComputedStyle(sizeTitleIllustration, null).getPropertyValue("margin-top").slice(0, window.getComputedStyle(sizeTitleIllustration, null).getPropertyValue("margin-top").length - 2));
    let sizeMarginHeader = parseFloat(window.getComputedStyle(marginHeader, null).getPropertyValue("margin-top").slice(0, window.getComputedStyle(marginHeader, null).getPropertyValue("margin-top").length - 2));
    let totalSize = sizeTitleIllustration.offsetHeight + sizeMargin + sizeMarginHeader;
    
    backgroundSize.style.height = (totalSize + 2) + "px";
}

getMargin();

window.addEventListener('resize', getMargin);





// THAT CODE SNIPPET IS A MESS, BUT ANYWAY I WANT TO KEEP IT, SO JUST DON'T PAY ATTENTION TO IT

/* let backgroundSize = document.querySelector('.additional-background');

let sizeSlogan = document.querySelector('#slogan');
let sizeInput = document.querySelector("#city-name");
let sizeButton = document.querySelector('#button');
let sizeSection = document.querySelector('section');
let sizeError = document.querySelector('aside');

function getMargin() {
    let elementsList = [sizeSlogan, sizeInput, sizeButton, sizeSection, sizeError];
    let marginValues = [];
    for(let z = 0; z < elementsList.length; z++) {
        if(window.getComputedStyle(elementsList[z], null).getPropertyValue("margin-top") !== "" 
        && window.getComputedStyle(elementsList[z], null).getPropertyValue("margin-top") !== "auto" 
        && window.getComputedStyle(elementsList[z], null).getPropertyValue("margin-top") !== "0px" 
        && window.getComputedStyle(elementsList[z], null).getPropertyValue("margin-top") !== "0") {
            marginValues.push(parseFloat(window.getComputedStyle(elementsList[z], null).getPropertyValue("margin-top").slice(0, window.getComputedStyle(elementsList[z], null).getPropertyValue("margin-top").length - 2)));
        }
        if(window.getComputedStyle(elementsList[z], null).getPropertyValue("margin-bottom") !== "" 
        && window.getComputedStyle(elementsList[z], null).getPropertyValue("margin-bottom") !== "auto" 
        && window.getComputedStyle(elementsList[z], null).getPropertyValue("margin-bottom") !== "0px" 
        && window.getComputedStyle(elementsList[z], null).getPropertyValue("margin-bottom") !== "0") {
            marginValues.push(parseFloat(window.getComputedStyle(elementsList[z], null).getPropertyValue("margin-bottom").slice(0, window.getComputedStyle(elementsList[z], null).getPropertyValue("margin-bottom").length - 2)));
        }
    }

    let margin = 0;
    for(let y = 0; y < marginValues.length; y++) {
        margin += marginValues[y];
    }

    let totalSize = (sizeSlogan.offsetHeight + sizeInput.offsetHeight + sizeButton.offsetHeight + sizeSection.offsetHeight + sizeError.offsetHeight) + margin;

    backgroundSize.style.height = totalSize + "px";
}

getMargin();

window.addEventListener('resize', getMargin);

let observer = new MutationObserver(function(mutations) {
    mutations.forEach(mutationRecord => {
        console.log(mutationRecord);
        if(mutationRecord.type === "attributes" && mutationRecord.attributeName === "style") {
            getMargin();
        }
    });
});

observer.observe(sizeSection, {
    attributes: true
});
observer.observe(sizeError, {
    subtree: true,
    attributes: true
}); */