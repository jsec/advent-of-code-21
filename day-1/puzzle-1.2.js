import { loadData } from "../util/index.js";
import * as R from "ramda";

const reducer = (a, b) => a + b;

const data = (await loadData("1-1.txt"))
  .split("\n")
  .slice(0, -1)
  .map((d) => parseInt(d));

const count = R.aperture(3, data).filter((el, idx, arr) => {
  return idx > 0 && el.reduce(reducer) > arr[idx - 1].reduce(reducer);
}).length;

console.log(count);
