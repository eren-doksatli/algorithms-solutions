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
 * Complete the 'journeyToMoon' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY astronaut
 */

function journeyToMoon(n, astronaut) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of astronaut) {
    graph[u].push(v);
    graph[v].push(u);
  }

  let visited = Array(n).fill(false);

  function dfs(node) {
    let size = 1;
    visited[node] = true;
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        size += dfs(neighbor);
      }
    }
    return size;
  }

  let components = [];
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      components.push(dfs(i));
    }
  }

  let totalPairs = (n * (n - 1)) / 2;
  let sameCountryPairs = components.reduce(
    (sum, size) => sum + (size * (size - 1)) / 2,
    0
  );

  return totalPairs - sameCountryPairs;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const p = parseInt(firstMultipleInput[1], 10);

  let astronaut = Array(p);

  for (let i = 0; i < p; i++) {
    astronaut[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((astronautTemp) => parseInt(astronautTemp, 10));
  }

  const result = journeyToMoon(n, astronaut);

  ws.write(result + "\n");

  ws.end();
}
