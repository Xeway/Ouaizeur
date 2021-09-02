let deferredPrompt;
let buttonInstall = document.querySelector('#button-install');
let divPrompt = document.querySelector('.button-install-box');

divPrompt.style.display = "none";

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  divPrompt.style.display = "flex";
});

buttonInstall.addEventListener('click', (e) => {
  divPrompt.style.display = "none";
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if(choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      divPrompt.style.display = "flex";
    }
    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', (e) => {
  divPrompt.style.display = "none";
  deferredPrompt = null;
});