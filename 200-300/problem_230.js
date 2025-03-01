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
 * Complete the 'fairCut' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */

function fairCut(k, arr) {
  arr.sort((a, b) => a - b);
  let diff = 0;
  const n = arr.length;
  let set1 = arr.slice(0, k);
  let set2 = arr.slice(k);

  let sum1 = set1.reduce((acc, val) => acc + val, 0);
  let sum2 = set2.reduce((acc, val) => acc + val, 0);

  return Math.abs(sum1 - sum2);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const k = parseInt(firstMultipleInput[1], 10);

  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  const result = fairCut(k, arr);

  ws.write(result + "\n");

  ws.end();
}
