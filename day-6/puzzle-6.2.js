import { loadData } from "../util/index.js";

let data = (await loadData("6.txt")).split(",").map((d) => parseInt(d));

const tick = (days) => {
  let fish = new Array(9).fill(0);
  data.forEach((d) => fish[d]++);
  for (let day = 0; day < days; day++) {
    const newFish = fish.shift();
    fish[6] += newFish;
    fish.push(newFish);
  }

  return fish.reduce((a, b) => a + b);
};

const result = tick(256);
console.log(result);
