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
 * Complete the 'missingNumbers' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY arr
 *  2. INTEGER_ARRAY brr
 */

function missingNumbers(arr, brr) {
  const frequencyBrr = new Map();
  const frequencyArr = new Map();

  for (const num of brr) {
    frequencyBrr.set(num, (frequencyBrr.get(num) || 0) + 1);
  }

  for (const num of arr) {
    frequencyArr.set(num, (frequencyArr.get(num) || 0) + 1);
  }

  const missing = [];

  for (const [num, freq] of frequencyBrr.entries()) {
    if (freq !== (frequencyArr.get(num) || 0)) {
      missing.push(num);
    }
  }

  return missing.sort((a, b) => a - b);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  const m = parseInt(readLine().trim(), 10);

  const brr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((brrTemp) => parseInt(brrTemp, 10));

  const result = missingNumbers(arr, brr);

  ws.write(result.join(" ") + "\n");

  ws.end();
}
