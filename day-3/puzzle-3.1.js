import { loadData } from "../util/index.js";
import zip from "lodash-es/zip.js";
import countBy from "lodash-es/countBy.js";

const data = (await loadData("3.txt"))
  .split("\n")
  .slice(0, -1)
  .map((d) => d.split(""));

const bitCounts = zip(...data).map((d) => countBy(d));

const gamma = parseInt(
  bitCounts
    .map((hash) =>
      Object.keys(hash).reduce((a, b) => (hash[a] > hash[b] ? a : b))
    )
    .join(""),
  2
);

const epsilon = parseInt(
  bitCounts
    .map((hash) =>
      Object.keys(hash).reduce((a, b) => (hash[a] < hash[b] ? a : b))
    )
    .join(""),
  2
);

console.log(gamma * epsilon);
