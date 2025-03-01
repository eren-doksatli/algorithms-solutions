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
 * Complete the 'andProduct' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. LONG_INTEGER a
 *  2. LONG_INTEGER b
 */

function andProduct(a, b) {
  let result = 0;
  let shift = 0;

  while (a !== b) {
    a >>= 1;
    b >>= 1;
    shift++;
  }

  result = a << shift;
  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  for (let nItr = 0; nItr < n; nItr++) {
    const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const a = parseInt(firstMultipleInput[0], 10);

    const b = parseInt(firstMultipleInput[1], 10);

    const result = andProduct(a, b);

    ws.write(result + "\n");
  }

  ws.end();
}
