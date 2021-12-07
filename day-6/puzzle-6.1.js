import { loadData } from "../util/index.js";

const tick = (array) => {
  let ret = [];
  for (let item of array) {
    if (item === 0) {
      ret.push(6);
      ret.push(8);
    } else {
      ret.push(item - 1);
    }
  }

  console.log(ret.length);
  return ret;
};

let data = (await loadData("6-test.txt")).split(",").map((d) => parseInt(d));

let i = 0;
while (i < 256) {
  data = tick([...data]);
  i++;
}

console.log(data.length);
