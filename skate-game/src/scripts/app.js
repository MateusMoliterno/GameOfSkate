document.addEventListener('DOMContentLoaded', () => {
    const playerInput = document.getElementById('playerInput');
    const addPlayerButton = document.getElementById('addPlayer');
    const playerList = document.getElementById('playerList');
    const maneuverInput = document.getElementById('maneuverInput');
    const registerManeuverButton = document.getElementById('registerManeuver');
    const scoreList = document.getElementById('scoreList');

    let players = [];
    let maneuvers = [];

    addPlayerButton.addEventListener('click', () => {
        const playerName = playerInput.value.trim();
        if (playerName && !players.includes(playerName)) {
            players.push({ name: playerName, score: 0 });
            updatePlayerList();
            playerInput.value = '';
        }
    });

    registerManeuverButton.addEventListener('click', () => {
        const maneuver = maneuverInput.value.trim();
        if (maneuver) {
            maneuvers.push({ name: maneuver, player: null, results: {} });
            updateScoreList();
            maneuverInput.value = '';
        }
    });

    function updatePlayerList() {
        playerList.innerHTML = '';
        players.forEach(player => {
            const li = document.createElement('li');
            li.textContent = player.name;
            playerList.appendChild(li);
        });
    }

    function updateScoreList() {
        scoreList.innerHTML = '';
        maneuvers.forEach((maneuver, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${index + 1}. ${maneuver.name}
                <select data-index="${index}" class="playerSelect">
                    <option value="">Selecione o jogador</option>
                    ${players.map(player => `<option value="${player.name}">${player.name}</option>`).join('')}
                </select>
                ${players.map(player => `
                    <label>
                        ${player.name}
                        <input type="checkbox" data-player="${player.name}" data-index="${index}" class="resultCheckbox">
                    </label>
                `).join('')}
            `;
            scoreList.appendChild(li);
        });

        document.querySelectorAll('.playerSelect').forEach(select => {
            select.addEventListener('change', (event) => {
                const index = event.target.dataset.index;
                maneuvers[index].player = event.target.value;
            });
        });

        document.querySelectorAll('.resultCheckbox').forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                const index = event.target.dataset.index;
                const player = event.target.dataset.player;
                maneuvers[index].results[player] = event.target.checked;
                updatePlayerScores();
            });
        });
    }

    function updatePlayerScores() {
        players.forEach(player => {
            player.score = maneuvers.reduce((score, maneuver) => {
                return score + (maneuver.results[player.name] ? 1 : 0);
            }, 0);
        });
        updatePlayerList();
    }
});