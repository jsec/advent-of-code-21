import { loadData } from "../util/index.js";

const count = (await loadData("1-1.txt"))
  .split("\n")
  .slice(0, -1)
  .map((d) => parseInt(d))
  .filter((el, idx, arr) => {
    return idx > 0 && el > arr[idx - 1];
  }).length;

console.log(count);
