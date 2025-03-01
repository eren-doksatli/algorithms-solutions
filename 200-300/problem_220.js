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
 * Complete the 'prims' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY edges
 *  3. INTEGER start
 */

function prims(n, edges, start) {
  const adjList = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of edges) {
    adjList[u].push([v, w]);
    adjList[v].push([u, w]);
  }

  const minHeap = [[0, start]];
  const visited = new Set();
  let totalWeight = 0;

  while (minHeap.length) {
    minHeap.sort((a, b) => a[0] - b[0]);
    const [weight, node] = minHeap.shift();

    if (visited.has(node)) continue;
    visited.add(node);
    totalWeight += weight;

    for (const [neighbor, edgeWeight] of adjList[node]) {
      if (!visited.has(neighbor)) {
        minHeap.push([edgeWeight, neighbor]);
      }
    }
  }

  return totalWeight;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

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

  const start = parseInt(readLine().trim(), 10);

  const result = prims(n, edges, start);

  ws.write(result + "\n");

  ws.end();
}
