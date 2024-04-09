document.addEventListener('DOMContentLoaded', function() {
    // Dodanie obsługi kliknięcia dla nagłówków "Level"
    document.querySelectorAll('th:nth-child(3)').forEach(header => {
        header.addEventListener('click', function() {
            // Pobranie aktualnej gildii i stanu online
            const currentGuild = getCurrentGuild();
            const onlyOnline = document.getElementById('showOnline').classList.contains('active');

            // Sprawdzenie, czy dane są już posortowane i w jakim kierunku
            const isCurrentlyAscending = header.classList.contains('ascending');

            // Przekazanie informacji o sposobie sortowania do loadGuildMembers
            loadAndSortGuildMembers(currentGuild, onlyOnline, isCurrentlyAscending ? 'desc' : 'asc');

            // Odwrócenie klasy, by wskazać kierunek sortowania
            header.classList.toggle('ascending', !isCurrentlyAscending);
        });
    });
});

function loadAndSortGuildMembers(guildName, onlyOnline, sortOrder) {
    const url = `https://api.tibiadata.com/v4/guild/${guildName}?_=${new Date().getTime()}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let members = onlyOnline ? data.guild.members.filter(member => member.status === 'online') : data.guild.members;
            
            // Sortowanie członków na podstawie sortOrder
            if(sortOrder === 'asc') {
                members.sort((a, b) => a.level - b.level);
            } else {
                members.sort((a, b) => b.level - a.level);
            }

            // Wywołanie oryginalnej funkcji displayGuildMembers z posortowanymi danymi
            displayGuildMembers(members, guildName);
        })
        .catch(error => console.error(`Error fetching ${guildName} guild data:`, error));
}
