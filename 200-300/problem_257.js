"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'roadsAndLibraries' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 * 1. INTEGER n
 * 2. INTEGER c_lib
 * 3. INTEGER c_road
 * 4. 2D_INTEGER_ARRAY cities
 */

function roadsAndLibraries(n, c_lib, c_road, cities) {
  if (c_lib <= c_road) {
    return BigInt(n) * BigInt(c_lib);
  }

  const adj = Array(n + 1)
    .fill(null)
    .map(() => []);
  for (const city of cities) {
    adj[city[0]].push(city[1]);
    adj[city[1]].push(city[0]);
  }

  const visited = Array(n + 1).fill(false);
  let totalCost = BigInt(0);

  function dfs(node, count) {
    visited[node] = true;
    count++;
    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        count = dfs(neighbor, count);
      }
    }
    return count;
  }

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      const componentSize = dfs(i, 0);
      totalCost += BigInt(c_lib) + BigInt(componentSize - 1) * BigInt(c_road);
    }
  }

  return totalCost;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const c_lib = parseInt(firstMultipleInput[2], 10);

    const c_road = parseInt(firstMultipleInput[3], 10);

    let cities = Array(m);

    for (let i = 0; i < m; i++) {
      cities[i] = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((citiesTemp) => parseInt(citiesTemp, 10));
    }

    const result = roadsAndLibraries(n, c_lib, c_road, cities);

    ws.write(result + "\n");
  }

  ws.end();
}
