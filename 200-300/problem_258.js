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
 * Complete the 'kruskals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts WEIGHTED_INTEGER_GRAPH g as parameter.
 */

/*
 * For the weighted graph, <name>:
 *
 * 1. The number of nodes is <name>Nodes.
 * 2. The number of edges is <name>Edges.
 * 3. An edge exists between <name>From[i] and <name>To[i]. The weight of the edge is <name>Weight[i].
 *
 */

function kruskals(gNodes, gFrom, gTo, gWeight) {
  const edges = [];
  for (let i = 0; i < gFrom.length; i++) {
    edges.push({ from: gFrom[i], to: gTo[i], weight: gWeight[i] });
  }

  edges.sort((a, b) => a.weight - b.weight);

  const parent = Array(gNodes + 1)
    .fill(0)
    .map((_, i) => i);

  function find(i) {
    if (parent[i] === i) {
      return i;
    }
    return (parent[i] = find(parent[i]));
  }

  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
      return true;
    }
    return false;
  }

  let minCost = 0;
  for (const edge of edges) {
    if (union(edge.from, edge.to)) {
      minCost += edge.weight;
    }
  }

  return minCost;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const gNodesEdges = readLine().split(" ");

  const gNodes = parseInt(gNodesEdges[0], 10);
  const gEdges = parseInt(gNodesEdges[1], 10);

  let gFrom = [];
  let gTo = [];
  let gWeight = [];

  for (let i = 0; i < gEdges; i++) {
    const gFromToWeight = readLine().split(" ");

    gFrom.push(parseInt(gFromToWeight[0], 10));
    gTo.push(parseInt(gFromToWeight[1], 10));
    gWeight.push(parseInt(gFromToWeight[2], 10));
  }

  const res = kruskals(gNodes, gFrom, gTo, gWeight);

  ws.write(res + "\n");

  ws.end();
}
