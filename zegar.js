function aktualizujCzas() {
    var teraz = new Date();
    var godziny = teraz.getHours();
    var minuty = teraz.getMinutes();
    var sekundy = teraz.getSeconds();
    minuty = sprawdzCzas(minuty);
    sekundy = sprawdzCzas(sekundy);
    var zegarDiv = document.getElementById('zegar');
    zegarDiv.innerHTML = godziny + ":" + minuty + ":" + sekundy;
    setTimeout(aktualizujCzas, 1000);
}

function sprawdzCzas(i) {
    if (i < 10) {i = "0" + i}; // Dodaje "0" przed liczbami < 10
    return i;
}

document.addEventListener('DOMContentLoaded', (event) => {
    aktualizujCzas(); // Upewnij się, że zegar zacznie działać po załadowaniu DOM.
    ustawStylZegara();
});

function ustawStylZegara() {
    var zegarDiv = document.getElementById('zegar');
    zegarDiv.style.position = 'absolute';
    zegarDiv.style.top = '27px';
    zegarDiv.style.right = '15px';
    zegarDiv.style.padding = '10px';
    zegarDiv.style.backgroundColor = '#333';
    zegarDiv.style.color = 'white';
    zegarDiv.style.textAlign = 'center';
    zegarDiv.style.borderRadius = '8px';
    zegarDiv.style.zIndex = '1000';
}
