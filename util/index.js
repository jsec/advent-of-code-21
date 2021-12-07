import { createReadStream } from "fs";
import { resolve } from "path";
import { finished } from "stream/promises";

export async function loadData(filename) {
  let data = "";
  const path = resolve("./data", filename);

  const stream = createReadStream(path, { encoding: "utf8" });

  stream.on("data", (chunk) => {
    data += chunk;
  });

  await finished(stream);
  return data.trim();
}
