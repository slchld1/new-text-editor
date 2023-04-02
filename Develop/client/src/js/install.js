const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('initiated');
    event.preventDefault();
    window.deferredPrompt = event;
    
    butInstall.classList.toggle('hidden', false);

});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const newEvent = window.deferredPrompt;

    if(!newEvent) {
        return;
    }

    newEvent.prompt();

    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true)
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('installed');
    window.deferredPrompt = null;

});