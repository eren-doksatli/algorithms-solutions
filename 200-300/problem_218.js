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
 * Complete the 'bfs' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. 2D_INTEGER_ARRAY edges
 *  4. INTEGER s
 */

function bfs(n, m, edges, s) {
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const distances = Array(n + 1).fill(-1);
  distances[s] = 0;

  const queue = [s];

  while (queue.length) {
    const node = queue.shift();

    for (const neighbor of graph[node]) {
      if (distances[neighbor] === -1) {
        distances[neighbor] = distances[node] + 6;
        queue.push(neighbor);
      }
    }
  }

  return distances.slice(1).filter((_, idx) => idx + 1 !== s);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let edges = Array(m);

    for (let i = 0; i < m; i++) {
      edges[i] = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((edgesTemp) => parseInt(edgesTemp, 10));
    }

    const s = parseInt(readLine().trim(), 10);

    const result = bfs(n, m, edges, s);

    ws.write(result.join(" ") + "\n");
  }

  ws.end();
}
