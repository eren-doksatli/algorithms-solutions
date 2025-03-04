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
 * Complete the 'maximumSum' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. LONG_INTEGER_ARRAY a
 *  2. LONG_INTEGER m
 */

function maximumSum(a, m) {
  let maxSum = 0;
  for (let i = 0; i < a.length; i++) {
    let currentSum = 0;
    for (let j = i; j < a.length; j++) {
      currentSum = (currentSum + a[j]) % m;
      maxSum = Math.max(maxSum, currentSum);
    }
  }
  return maxSum;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const a = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((aTemp) => parseInt(aTemp, 10));

    const result = maximumSum(a, m);

    ws.write(result + "\n");
  }

  ws.end();
}
