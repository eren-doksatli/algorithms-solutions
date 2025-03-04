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
 * Complete the 'powerSum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER X
 *  2. INTEGER N
 */

function powerSum(X, N) {
  function solve(x, n, current) {
    const power = Math.pow(current, n);
    if (power > x) {
      return 0;
    } else if (power === x) {
      return 1;
    } else {
      return solve(x - power, n, current + 1) + solve(x, n, current + 1);
    }
  }

  return solve(X, N, 1);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const X = parseInt(readLine().trim(), 10);

  const N = parseInt(readLine().trim(), 10);

  const result = powerSum(X, N);

  ws.write(result + "\n");

  ws.end();
}
