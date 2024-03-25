let cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let cards = [];
let flippedCards = [];
let matchedCards = [];
let gameBoard = document.getElementById('tabuleiro');

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function iniciarJogo() {
    // Reiniciar arrays
    flippedCards = [];
    matchedCards = [];

    cards = embaralhar(cardValues.map(value => ({ value, flipped: false })));
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', virarCarta);
        gameBoard.appendChild(cardElement);
    });

    document.querySelector('button').style.display = 'none';
}

function virarCarta() {
    const index = parseInt(this.dataset.index);
    const card = cards[index];

    if (flippedCards.length < 2 && !card.flipped && !matchedCards.includes(index)) {
        this.textContent = card.value;
        this.style.backgroundColor = '#fff';

        flippedCards.push({ element: this, index });

        if (flippedCards.length === 2) {
            if (cards[flippedCards[0].index].value === cards[flippedCards[1].index].value) {
                matchedCards.push(flippedCards[0].index, flippedCards[1].index);
                flippedCards = [];

                if (matchedCards.length === cards.length) {
                    setTimeout(() => {
                        alert('Parabéns! Você venceu!');
                        document.querySelector('button').style.display = 'block';
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    flippedCards.forEach(card => {
                        card.element.textContent = '';
                        card.element.style.backgroundColor = '#ddd';
                    });
                    flippedCards = [];
                }, 1000);
            }
        }
    }
}
