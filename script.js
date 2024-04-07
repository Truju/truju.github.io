document.addEventListener('DOMContentLoaded', function() {
    attachEventListeners();
    loadGuildMembers();
});

function attachEventListeners() {
    document.getElementById('showOnline').addEventListener('click', function() {
        loadGuildMembers(true); // Tylko gracze online
    });

    document.getElementById('showAll').addEventListener('click', function() {
        loadGuildMembers(false); // Wszyscy członkowie
    });
}

function loadGuildMembers(onlyOnline = false) {
    const url = `https://api.tibiadata.com/v4/guild/Sleepers?_=${new Date().getTime()}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const members = onlyOnline ? data.guild.members.filter(member => member.status === 'online') : data.guild.members;
            displayGuildMembers(members);
        })
        .catch(error => console.error('Error fetching guild data:', error));
}

function displayGuildMembers(members) {
    const tableBody = document.getElementById('highscoresBody');
    tableBody.innerHTML = ''; // Clear existing data

    members.forEach((member, index) => {
        const expForCurrentLevel = calculateExpForLevel(member.level);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${index + 1}.</td>
            <td>${member.name}</td>
            <td>${member.rank}</td>
            <td>${member.level}</td>
            <td>${member.vocation}</td>
            <td>${expForCurrentLevel.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

function calculateExpForLevel(level) {
    return (50 / 3) * (Math.pow(level - 1, 3) - 6 * Math.pow(level - 1, 2) + 17 * (level - 1) - 12);
}