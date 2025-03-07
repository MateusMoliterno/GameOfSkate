document.addEventListener('DOMContentLoaded', () => {
    const playerInput = document.getElementById('playerInput');
    const addPlayerButton = document.getElementById('addPlayer');
    const playerList = document.getElementById('playerList');

    let players = [];


    addPlayerButton.addEventListener('click', () => {
        const playerName = playerInput.value.trim();
        if (playerName && !players.includes(playerName)) {
            players.push({ name: playerName, score: 0 });
            updatePlayerList();
            playerInput.value = '';
        }
    });


    function updatePlayerList() {
        playerList.innerHTML = ''; 
    
        players.forEach((player, index) => {
            const li = document.createElement('li');
    
            const nameSpan = document.createElement('span');
            nameSpan.textContent = player.name;
            nameSpan.classList.add('player-name');
            
            const letterSpan = document.createElement('span');
            letterSpan.classList.add('letters');
    
            if (!player.letters) {
                player.letters = '';
            }
            letterSpan.textContent = player.letters;
    
            const letterButton = document.createElement('button');
            letterButton.textContent = 'Letra 💀';
            letterButton.classList.add('letter-btn');
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Destruir ❌';
            deleteButton.classList.add('delete-btn');
    
            letterButton.addEventListener('click', () => {
                const lettersArray = ['S.', 'K.', 'A.', 'T.', 'E'];
                
                const currentLetterCount = player.letters.split(' ').filter(l => l).length;
                if (currentLetterCount < lettersArray.length) {
                    player.letters += lettersArray[currentLetterCount] + ' ';
                    letterSpan.textContent = player.letters;
                }
            });
    
            deleteButton.addEventListener('click', () => {
                players.splice(index, 1);
                updatePlayerList();
            });
    
            li.appendChild(nameSpan);
            li.appendChild(deleteButton);
            li.appendChild(letterButton);
            li.appendChild(document.createElement('br'));
            li.appendChild(letterSpan);
            playerList.appendChild(li);
        });
    }

});