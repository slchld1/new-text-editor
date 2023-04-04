const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// beforeinstallprompt
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
    
    butInstall.style.visibility='visible'

});

// 'butInstall' click event handler 
butInstall.addEventListener('click', async () => {
    const newEvent = window.deferredPrompt;

    if(!newEvent) {
        return;
    }

    newEvent.prompt();

    window.deferredPrompt = null;
    // disable the button once installed
    butInstall.setAttribute('disabled', true)
    butInstall.style.visibility = 'hidden'
});


// 'appinstalled' event handler
window.addEventListener('appinstalled', (event) => {
    //once installed install button is hidden
    butInstall.textContent = 'Installed!'
    butInstall.style.visibility = 'hidden'
    window.deferredPrompt = null;
});
