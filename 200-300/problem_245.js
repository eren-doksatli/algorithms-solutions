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
 * Complete the 'sherlockAndMinimax' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY arr
 *  2. INTEGER p
 *  3. INTEGER q
 */

function sherlockAndMinimax(arr, p, q) {
  arr.sort((a, b) => a - b);
  let maxMinDiff = -1;
  let result = -1;

  function findMinDiff(num) {
    let minDiff = Infinity;
    for (let i = 0; i < arr.length; i++) {
      minDiff = Math.min(minDiff, Math.abs(num - arr[i]));
    }
    return minDiff;
  }

  for (let i = p; i <= q; i++) {
    const minDiff = findMinDiff(i);
    if (minDiff > maxMinDiff) {
      maxMinDiff = minDiff;
      result = i;
    }
  }

  // Check between array values
  for (let i = 0; i < arr.length - 1; i++) {
    let mid = Math.floor((arr[i] + arr[i + 1]) / 2);
    if (mid >= p && mid <= q) {
      const minDiff = findMinDiff(mid);
      if (minDiff > maxMinDiff) {
        maxMinDiff = minDiff;
        result = mid;
      }
    }
  }

  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const p = parseInt(firstMultipleInput[0], 10);

  const q = parseInt(firstMultipleInput[1], 10);

  const result = sherlockAndMinimax(arr, p, q);

  ws.write(result + "\n");

  ws.end();
}
