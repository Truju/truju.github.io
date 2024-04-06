document.addEventListener('DOMContentLoaded', function() {
    loadGuildMembersOnline();
});

function loadGuildMembersOnline() {
    const url = `https://api.tibiadata.com/v4/guild/Sleepers?_=${new Date().getTime()}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayGuildMembersOnline(data.guild.members);
        })
        .catch(error => console.error('Error fetching guild data:', error));
}

function calculateExpForLevel(level) {
    return (50 / 3) * (Math.pow(level - 1, 3) - 6 * Math.pow(level - 1, 2) + 17 * (level - 1) - 12);
}

function displayGuildMembersOnline(members) {
    const tableBody = document.getElementById('highscoresBody');
    tableBody.innerHTML = ''; // Clear existing data

    members.filter(member => member.status === 'online').forEach(member => {
        const expForCurrentLevel = calculateExpForLevel(member.level);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.rank}</td>
            <td>${member.level}</td>
            <td>${member.vocation}</td>
            <td>${expForCurrentLevel.toLocaleString()}</td> <!-- Display EXP with commas -->
        `;
        tableBody.appendChild(row);
    });
}
