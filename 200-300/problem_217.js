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
 * Complete the 'shop' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. STRING_ARRAY centers
 *  4. 2D_INTEGER_ARRAY roads
 */

function shop(n, k, centers, roads) {
  const INF = 1e9;
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v, w] of roads) {
    graph[u - 1].push([v - 1, w]);
    graph[v - 1].push([u - 1, w]);
  }

  const itemMasks = centers.map((center) => {
    const items = center.split(" ").map(Number);
    return items.length > 1
      ? items.slice(1).reduce((mask, item) => mask | (1 << (item - 1)), 0)
      : 0;
  });

  const dp = Array.from({ length: n }, () => Array(1 << k).fill(INF));
  dp[0][itemMasks[0]] = 0;

  const pq = [[0, 0, itemMasks[0]]]; // [cost, node, mask]

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [cost, node, mask] = pq.shift();

    if (cost > dp[node][mask]) continue;

    for (const [next, weight] of graph[node]) {
      const newMask = mask | itemMasks[next];
      const newCost = cost + weight;

      if (newCost < dp[next][newMask]) {
        dp[next][newMask] = newCost;
        pq.push([newCost, next, newMask]);
      }
    }
  }

  let minCost = INF;
  for (let mask1 = 0; mask1 < 1 << k; mask1++) {
    for (let mask2 = 0; mask2 < 1 << k; mask2++) {
      if ((mask1 | mask2) === (1 << k) - 1) {
        minCost = Math.min(
          minCost,
          Math.max(dp[n - 1][mask1], dp[n - 1][mask2])
        );
      }
    }
  }

  return minCost === INF ? -1 : minCost;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const m = parseInt(firstMultipleInput[1], 10);

  const k = parseInt(firstMultipleInput[2], 10);

  let centers = [];

  for (let i = 0; i < n; i++) {
    const centersItem = readLine();
    centers.push(centersItem);
  }

  let roads = Array(m);

  for (let i = 0; i < m; i++) {
    roads[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((roadsTemp) => parseInt(roadsTemp, 10));
  }

  const res = shop(n, k, centers, roads);

  ws.write(res + "\n");

  ws.end();
}
