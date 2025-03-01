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
 * Complete the 'candies' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER_ARRAY arr
 */

function candies(n, arr) {
  const candiesArr = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    if (arr[i] > arr[i - 1]) {
      candiesArr[i] = candiesArr[i - 1] + 1;
    }
  }

  for (let i = n - 2; i >= 0; i--) {
    if (arr[i] > arr[i + 1]) {
      candiesArr[i] = Math.max(candiesArr[i], candiesArr[i + 1] + 1);
    }
  }

  return candiesArr.reduce((sum, candy) => sum + candy, 0);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  let arr = [];

  for (let i = 0; i < n; i++) {
    const arrItem = parseInt(readLine().trim(), 10);
    arr.push(arrItem);
  }

  const result = candies(n, arr);

  ws.write(result + "\n");

  ws.end();
}
