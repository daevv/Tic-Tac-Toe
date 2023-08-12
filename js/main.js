import { TicTacToe } from "./TicTacToe.js";

const field = document.querySelector('.game-field');
const resetButton = document.querySelector('.reset-button');
const resultTitle = document.querySelector('.game-result');
const scoreTable = document.querySelector('.score-table');

const newGame = new TicTacToe(field, resetButton, resultTitle, scoreTable);

newGame.startGame();