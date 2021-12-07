import { loadData } from "../util/index.js";

let data = (await loadData("5.txt")).split("\n").map((d) => {
  const split = d.split(" ");
  const fromCoords = split[0].split(",");
  const toCoords = split[2].split(",");

  return {
    fromX: parseInt(fromCoords[0]),
    fromY: parseInt(fromCoords[1]),
    toX: parseInt(toCoords[0]),
    toY: parseInt(toCoords[1]),
  };
});

const getMax = (array) => {
  return array.reduce((a, b) => (a > b ? a : b));
};

const getLineRange = (a, b) => {
  return a > b ? { start: b, end: a } : { start: a, end: b };
};

const placeLine = (array, item) => {
  if (item.fromX === item.toX) {
    const { start, end } = getLineRange(item.fromY, item.toY);
    for (let i = start; i <= end; i++) {
      array[i][item.fromX]++;
    }
  } else if (item.fromY === item.toY) {
    const { start, end } = getLineRange(item.fromX, item.toX);
    for (let i = start; i <= end; i++) {
      array[item.fromY][i]++;
    }
  } else {
    let x = item.fromX;
    let y = item.fromY;

    while (x !== item.toX && y !== item.toY) {
      array[y][x]++;

      x = x > item.toX ? x - 1 : x + 1;
      y = y > item.toY ? y - 1 : y + 1;
    }

    array[item.toY][item.toX]++;
  }
};

const maxX = getMax(data.map((x) => x.fromX).concat(data.map((x) => x.toX)));
const maxY = getMax(data.map((y) => y.fromY).concat(data.map((y) => y.toY)));
const max = Math.max(maxY, maxX) + 1;
const array = Array.from(Array(max), () => new Array(max).fill(0));

for (let item of data) {
  placeLine(array, item);
}

const count = array
  .map((a) => a.filter((x) => x > 1).length)
  .reduce((a, b) => a + b, 0);

console.log(count);
