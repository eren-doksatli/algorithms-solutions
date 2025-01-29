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
 * Complete the 'beautifulPairs' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY A
 *  2. INTEGER_ARRAY B
 */

function beautifulPairs(A, B) {
  let freqA = new Map();
  let freqB = new Map();

  for (let num of A) freqA.set(num, (freqA.get(num) || 0) + 1);
  for (let num of B) freqB.set(num, (freqB.get(num) || 0) + 1);

  let count = 0;
  for (let [num, freq] of freqA) {
    if (freqB.has(num)) {
      count += Math.min(freq, freqB.get(num));
    }
  }

  return count < A.length ? count + 1 : count - 1;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const A = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((ATemp) => parseInt(ATemp, 10));

  const B = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((BTemp) => parseInt(BTemp, 10));

  const result = beautifulPairs(A, B);

  ws.write(result + "\n");

  ws.end();
}
