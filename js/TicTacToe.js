export class TicTacToe {
  #field;
  #resetButton;
  #resultTitle;
  #scoreTable;

  static winCombinations = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6'],
  ];
  
  isXTurn = true;
  xSteps = [];
  oSteps = [];
  pressed = [];
  xWins = 0;
  oWins = 0;
  numberOfGames = 0;

  constructor(field, resetButton, resultTitle, scoreTable) {
    this.#field = field;
    this.#resetButton = resetButton;
    this.#resultTitle = resultTitle;
    this.#scoreTable = scoreTable;
  }

  updateTable = () => {
    this.#scoreTable.querySelector('.total').textContent = this.numberOfGames;
    this.#scoreTable.querySelector('.xWins').textContent = this.xWins;
    this.#scoreTable.querySelector('.oWins').textContent = this.oWins;
  }

  endGame = (winner) => {
    this.numberOfGames += 1;
    switch (winner) {
      case 'x':
        this.#resultTitle.textContent = 'X is winner';
        this.xWins += 1;
        break;
      case '0':
        this.#resultTitle.textContent = '0 is winner';
        this.oWins += 1;
        break;
      case '':
        this.#resultTitle.textContent = 'There are no winners';
        break;
      default:
        throw new Error();
    };
    this.#field.classList.add('game-field--blocked');
    this.updateTable();
  }

  cellClick = (evt) => {
    const id = evt.target.id;
    if (this.pressed.includes(id)) {
      return;
    }
    this.pressed.push(id);
    if (this.isXTurn) {
      evt.target.textContent = 'X';
      this.xSteps.push(id);
      if (TicTacToe.winCombinations.some((winCombination) => winCombination.every((cell) => this.xSteps.includes(cell)))) {
        this.endGame('x');
        return;
      }
    } else {
      evt.target.textContent = '0';
      this.oSteps.push(id);
      if (TicTacToe.winCombinations.some((winCombination) => winCombination.every((cell) => this.oSteps.includes(cell)))) {
        this.endGame('0');
        return;
      }
    }

    if (this.pressed.length === 9) {
      this.endGame('');
      return;
    }
    this.isXTurn = !this.isXTurn;
  };

  startGame = () => {
    for (let i = 0; i < 9; i += 1) {
      this.#field.insertAdjacentHTML('beforeend', `<div class='cell' id='${i}'></div>`);
      this.#field.lastElementChild.addEventListener('click', this.cellClick);
    }
    this.#resetButton.addEventListener('click', this.reset);
  }

  reset = () => {
    this.#field.innerHTML = '';
    this.#resultTitle.textContent = '';
    this.isXTurn = true;
    this.xSteps = [];
    this.oSteps = [];
    this.pressed = [];
    this.startGame();
    this.#field.classList.remove('game-field--blocked');
  }
}