if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceWorker.js')
        .then(register => console.log('SW registrado', register))
        .catch(error => console.log(error));
} else {
    console.log('No soportado');
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir que el prompt se muestre automáticamente
    e.preventDefault();
    deferredPrompt = e;
    // Aquí puedes mostrar un botón para que el usuario instale la PWA
    document.getElementById('download-btn').style.display = 'block'; // Muestra el botón
});

document.querySelector('#download-btn').addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Usuario aceptó la instalación de la PWA');
            } else {
                console.log('Usuario rechazó la instalación de la PWA');
            }
            deferredPrompt = null;
        });
    }
});

