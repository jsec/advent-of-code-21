import { loadData } from "../util/index.js";
import zip from "lodash-es/zip.js";
import countBy from "lodash-es/countBy.js";

const getOxygenRating = (data, hash, i = 0) => {
  if (data.length === 1) return parseInt(data[0].join(""), 2);

  data = data.filter((d) => d[i] === hash[i]);
  hash = getHash(data);
  i += 1;

  return getOxygenRating(data, hash, i);
};

const getCo2Rating = (data, hash, i = 0) => {
  if (data.length === 1) return parseInt(data[0].join(""), 2);

  data = data.filter((d) => d[i] !== hash[i]);
  hash = getHash(data);
  i += 1;

  return getCo2Rating(data, hash, i);
};

const getHash = (data) => {
  const bitCounts = zip(...data).map((d) => countBy(d));

  const hash = bitCounts.map((h) =>
    Object.keys(h).reduce((a, b) => (h[a] > h[b] ? a : b))
  );

  return hash;
};

const data = (await loadData("3.txt"))
  .split("\n")
  .slice(0, -1)
  .map((d) => d.split(""));

const hash = getHash(data);
const oxygen = getOxygenRating(data, hash);
const co2 = getCo2Rating(data, hash);

console.log(oxygen * co2);
