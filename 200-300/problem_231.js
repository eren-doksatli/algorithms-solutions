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
 * Complete the 'maxSubarray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function maxSubarray(arr) {
  let maxContiguous = -Infinity;
  let currentContiguous = 0;
  let maxNonContiguous = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    currentContiguous = Math.max(arr[i], currentContiguous + arr[i]);
    maxContiguous = Math.max(maxContiguous, currentContiguous);

    if (arr[i] > 0) {
      maxNonContiguous =
        maxNonContiguous === -Infinity ? arr[i] : maxNonContiguous + arr[i];
    } else {
      maxNonContiguous = Math.max(maxNonContiguous, arr[i]);
    }
  }

  if (maxNonContiguous === -Infinity) {
    maxNonContiguous = Math.max(...arr);
  }

  return [maxContiguous, maxNonContiguous];
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((arrTemp) => parseInt(arrTemp, 10));

    const result = maxSubarray(arr);

    ws.write(result.join(" ") + "\n");
  }

  ws.end();
}
