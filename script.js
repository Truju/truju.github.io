document.addEventListener('DOMContentLoaded', function() {
    attachEventListeners();
    // Domyślnie ładuje gildię "Sleepers" i pokazuje ich tabelę
    loadGuildMembers('Sleepers', false);
    toggleTableVisibility('Sleepers'); // Upewnij się, że tylko tabela dla Sleepers jest widoczna
});

function attachEventListeners() {
    document.getElementById('showOnline').addEventListener('click', function() {
        const currentGuild = getCurrentGuild();
        loadGuildMembers(currentGuild, true); // Tylko gracze online
    });

    document.getElementById('showAll').addEventListener('click', function() {
        const currentGuild = getCurrentGuild();
        loadGuildMembers(currentGuild, false); // Wszyscy członkowie
    });

    document.getElementById('showSleepers').addEventListener('click', function() {
        toggleGuildActiveState('Sleepers');
        loadGuildMembers('Sleepers', false);
        toggleTableVisibility('Sleepers');
    });

    document.getElementById('showReapers').addEventListener('click', function() {
        toggleGuildActiveState('Reapers');
        loadGuildMembers('Reapers', false);
        toggleTableVisibility('Reapers');
    });
}

function getCurrentGuild() {
    return document.querySelector('.active-guild').textContent.includes('Sleepers') ? 'Sleepers' : 'Reapers';
}

function toggleGuildActiveState(guildName) {
    if(guildName === 'Sleepers') {
        document.getElementById('showSleepers').classList.add('active-guild');
        document.getElementById('showReapers').classList.remove('active-guild');
    } else {
        document.getElementById('showReapers').classList.add('active-guild');
        document.getElementById('showSleepers').classList.remove('active-guild');
    }
}

function toggleTableVisibility(guildName) {
    const sleepersTableContainer = document.querySelector('.table-container:first-child');
    const reapersTableContainer = document.querySelector('.table-container:last-child');
    
    if (guildName === 'Sleepers') {
        sleepersTableContainer.style.display = '';
        reapersTableContainer.style.display = 'none';
    } else {
        sleepersTableContainer.style.display = 'none';
        reapersTableContainer.style.display = '';
    }
}

function loadGuildMembers(guildName, onlyOnline = false) {
    const url = `https://api.tibiadata.com/v4/guild/${guildName}?_=${new Date().getTime()}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const members = onlyOnline ? data.guild.members.filter(member => member.status === 'online') : data.guild.members;
            displayGuildMembers(members, guildName);
        })
        .catch(error => console.error(`Error fetching ${guildName} guild data:`, error));
}

function displayGuildMembers(members, guildName) {
    const tableBodyId = guildName === 'Sleepers' ? 'highscoresBody' : 'reapersBody';
    const tableBody = document.getElementById(tableBodyId);
    tableBody.innerHTML = '';

    members.forEach((member, index) => {
        const expForCurrentLevel = calculateExpForLevel(member.level);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${index + 1}.</td>
            <td>${member.name}</td>
            <!--<td>${member.rank}</td> Usunięto kolumnę Rank -->
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
