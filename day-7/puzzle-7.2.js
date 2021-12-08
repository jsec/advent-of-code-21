import { loadData } from "../util/index.js";

const data = (await loadData("7.txt")).split(",").map((d) => parseInt(d));
let maxMoves = Math.max(...data);

const fuelCalculations = [];

for (let i = 0; i <= maxMoves; i++) {
  const fuelUsed = data
    .map((d) => {
      const distance = Math.abs(d - i);
      return (distance * (distance + 1)) / 2;
    })
    .reduce((a, b) => a + b, 0);

  fuelCalculations.push(fuelUsed);
}

console.log(Math.min(...fuelCalculations));
