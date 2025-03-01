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
 * Complete the 'boardCutting' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY cost_y
 *  2. INTEGER_ARRAY cost_x
 */

function boardCutting(cost_y, cost_x) {
  const MOD = 1000000007;
  cost_y.sort((a, b) => b - a);
  cost_x.sort((a, b) => b - a);

  let verticalCuts = 1;
  let horizontalCuts = 1;
  let cost = 0;

  let i = 0;
  let j = 0;

  while (i < cost_y.length && j < cost_x.length) {
    if (cost_y[i] > cost_x[j]) {
      cost = (cost + cost_y[i] * horizontalCuts) % MOD;
      verticalCuts++;
      i++;
    } else {
      cost = (cost + cost_x[j] * verticalCuts) % MOD;
      horizontalCuts++;
      j++;
    }
  }

  while (i < cost_y.length) {
    cost = (cost + cost_y[i] * horizontalCuts) % MOD;
    verticalCuts++;
    i++;
  }

  while (j < cost_x.length) {
    cost = (cost + cost_x[j] * verticalCuts) % MOD;
    horizontalCuts++;
    j++;
  }

  return cost;
}
function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const m = parseInt(firstMultipleInput[0], 10);

    const n = parseInt(firstMultipleInput[1], 10);

    const cost_y = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((cost_yTemp) => parseInt(cost_yTemp, 10));

    const cost_x = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((cost_xTemp) => parseInt(cost_xTemp, 10));

    const result = boardCutting(cost_y, cost_x);

    ws.write(result + "\n");
  }

  ws.end();
}
