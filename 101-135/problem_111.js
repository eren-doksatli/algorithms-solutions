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
 * Complete the 'largestPermutation' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */
function largestPermutation(k, arr) {
  let n = arr.length;
  let indexMap = new Map();

  for (let i = 0; i < n; i++) {
    indexMap.set(arr[i], i);
  }

  for (let i = 0; i < n && k > 0; i++) {
    let maxVal = n - i;

    if (arr[i] !== maxVal) {
      let maxIndex = indexMap.get(maxVal);

      indexMap.set(arr[i], maxIndex);
      indexMap.set(maxVal, i);

      [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
      k--;
    }
  }

  return arr;
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

  const result = largestPermutation(k, arr);

  ws.write(result.join(" ") + "\n");

  ws.end();
}
