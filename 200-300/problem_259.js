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

// Complete the evenForest function below.
function evenForest(tNodes, tEdges, tFrom, tTo) {
  const adj = Array(tNodes + 1)
    .fill(null)
    .map(() => []);
  for (let i = 0; i < tEdges; i++) {
    adj[tFrom[i]].push(tTo[i]);
    adj[tTo[i]].push(tFrom[i]);
  }

  let cuts = 0;
  const visited = Array(tNodes + 1).fill(false);

  function dfs(node) {
    visited[node] = true;
    let count = 1;
    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        const subTreeCount = dfs(neighbor);
        if (subTreeCount % 2 === 0) {
          cuts++;
        } else {
          count += subTreeCount;
        }
      }
    }
    return count;
  }

  dfs(1);
  return cuts;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const tNodesEdges = readLine().split(" ");

  const tNodes = parseInt(tNodesEdges[0], 10);
  const tEdges = parseInt(tNodesEdges[1], 10);

  let tFrom = [];
  let tTo = [];

  for (let i = 0; i < tEdges; i++) {
    const tFromTo = readLine().split(" ");

    tFrom.push(parseInt(tFromTo[0], 10));
    tTo.push(parseInt(tFromTo[1], 10));
  }

  const res = evenForest(tNodes, tEdges, tFrom, tTo);

  ws.write(res + "\n");

  ws.end();
}
