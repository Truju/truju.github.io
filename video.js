function dodajWideo() {
    const videoURL = "https://www.youtube.com/embed/kTj-j32xRig";
    const container = document.querySelector('.content'); // Kontener, do którego dodamy wideo

    const videoContainer = document.createElement('div');
    videoContainer.classList.add('video-container');

    const iframe = document.createElement('iframe');
    iframe.setAttribute('width', '850');
    iframe.setAttribute('height', '500');
    iframe.setAttribute('src', videoURL);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('title', 'Sleepers Video');

    videoContainer.appendChild(iframe);
    container.appendChild(videoContainer);
}

document.addEventListener('DOMContentLoaded', (event) => {
    aktualizujCzas(); // Upewnij się, że zegar zacznie działać po załadowaniu DOM.
    ustawStylZegara();
    dodajWideo(); // Dodajemy wideo po załadowaniu DOM.
});