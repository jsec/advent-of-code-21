import { loadData } from "../util/index.js";
import groupBy from "lodash-es/groupBy.js";

const getNumbers = (numbers) => {
  return numbers.split(",").map((n) => parseInt(n));
};

const getBoard = (boardString) => {
  const board = boardString.split("\n").map((row, i) => {
    return row
      .trim()
      .split(/\s+/)
      .map((item, j) => {
        return {
          x: j,
          y: i,
          value: parseInt(item.trim()),
          selected: false,
        };
      });
  });

  return board.flat();
};

const markBoard = (board, value) => {
  const entry = board.find((item) => item.value === value);

  if (entry) entry.selected = true;
};

const checkGroup = (group) => {
  const win = Object.keys(group).find((x) => group[x].every((g) => g.selected));
  return win !== undefined;
};

const checkForWinner = (boards) => {
  const winners = [];

  for (let board of boards) {
    const xGroup = groupBy(board, "x");
    const yGroup = groupBy(board, "y");

    const xGroupWin = checkGroup(xGroup);
    const yGroupWin = checkGroup(yGroup);

    if (xGroupWin || yGroupWin) {
      winners.push(board);
    }
  }

  return winners;
};

const processWinner = (winner, finalNumber) => {
  const sum = winner
    .filter((w) => !w.selected)
    .map((a) => a.value)
    .reduce((a, b) => a + b, 0);

  console.log(sum * finalNumber);
};

const data = (await loadData("4.txt")).trim().split("\n\n");
const numbers = getNumbers(data[0]);
const boards = [];

for (let i = 1; i < data.length; i++) {
  boards.push(getBoard(data[i]));
}

for (let num of numbers) {
  for (let board of boards) {
    markBoard(board, num);
  }

  const winners = checkForWinner(boards);
  if (winners) {
    for (let winner of winners) {
      const winnerIdx = boards.indexOf(winner);
      boards.splice(winnerIdx, 1);

      if (boards.length === 0) {
        processWinner(winner, num);
        break;
      }
    }
  }
}
