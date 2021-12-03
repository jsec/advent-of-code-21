import { loadData } from "../util/index.js";

const data = (await loadData("2.txt"))
  .split("\n")
  .slice(0, -1)
  .map((d) => d.split(" "));

let horizontal = 0;
let depth = 0;
let aim = 0;

for (const movement of data) {
  const direction = movement[0];
  const length = parseInt(movement[1]);

  if (direction === "forward") {
    horizontal += length;
    depth += aim * length;
  }

  if (direction === "up") aim -= length;

  if (direction === "down") aim += length;
}

console.log(horizontal * depth);
