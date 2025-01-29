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
 * Complete the 'runningTime' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function runningTime(arr) {
  let shifts = 0;

  for (let i = 1; i < arr.length; i++) {
    let value = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > value) {
      arr[j + 1] = arr[j];
      j--;
      shifts++;
    }
    arr[j + 1] = value;
  }

  return shifts;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  const result = runningTime(arr);

  ws.write(result + "\n");

  ws.end();
}
