let divs = document.querySelectorAll('.cell');
let turn = 1;
let counter = 0;

const winningConditions = [
	[1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
	[1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
	[1, 5, 9], [3, 5, 7]              // diagonals
];

for (let i = 0; i < divs.length; i++) {
	divs[i].addEventListener('click', playerAction);
}

function playerAction(event) {
	if (event.target.textContent !== '') return;

	counter++;

	if (turn === 1) {
		event.target.textContent = 'X';
		switchTurn('O');
	} else {
		event.target.textContent = 'O';
		switchTurn('X');
	}

	if (counter === 9) {
		endGame("It's a Draw");
	}

	checkWinningConditions();
}

function switchTurn(nextPlayer) {
	document.querySelector('#messageSection').textContent = `Player "${nextPlayer}" turn`;
	turn = (nextPlayer === 'X') ? 1 : 2;
}

function endGame(message) {
	document.querySelector('#messageSection').textContent = message;
	for (let i = 0; i < divs.length; i++) {
		divs[i].removeEventListener('click', playerAction);
	}
}

function checkWinningConditions() {
	for (const condition of winningConditions) {
		const [cell1, cell2, cell3] = condition;
		const firstCell = document.querySelector(`#cell-${cell1}`).innerText;
		const secondCell = document.querySelector(`#cell-${cell2}`).innerText;
		const thirdCell = document.querySelector(`#cell-${cell3}`).innerText;

		if (firstCell !== '' && firstCell === secondCell && secondCell === thirdCell) {
			endGame(`${firstCell} wins`);
			return;
		}
	}
}
