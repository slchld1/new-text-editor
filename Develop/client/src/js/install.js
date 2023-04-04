const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// beforeinstallprompt
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('initiated');
    event.preventDefault();
    window.deferredPrompt = event;
    
    butInstall.classList.toggle('hidden', false);

});

// 'butInstall' click event handler 
butInstall.addEventListener('click', async () => {
    const newEvent = window.deferredPrompt;

    if(!newEvent) {
        return;
    }

    newEvent.prompt();

    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true)
});


// 'appinstalled' event handler
window.addEventListener('appinstalled', (event) => {
    console.log('installed');
    window.deferredPrompt = null;

});
