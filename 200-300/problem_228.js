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
 * Complete the 'equal' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function equal(arr) {
  const minVal = Math.min(...arr);
  let minOperations = Infinity;

  for (let base = minVal; base >= Math.max(0, minVal - 4); base--) {
    let operations = 0;
    for (const num of arr) {
      let diff = num - base;
      operations += Math.floor(diff / 5);
      diff %= 5;
      operations += Math.floor(diff / 2);
      diff %= 2;
      operations += diff;
    }
    minOperations = Math.min(minOperations, operations);
  }

  return minOperations;
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

    const result = equal(arr);

    ws.write(result + "\n");
  }

  ws.end();
}
