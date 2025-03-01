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
 * Complete the 'lilysHomework' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function countSwaps(arr, sortedArr) {
  let indexMap = new Map();
  for (let i = 0; i < arr.length; i++) {
    indexMap.set(arr[i], i);
  }

  let swaps = 0;
  let visited = new Array(arr.length).fill(false);

  for (let i = 0; i < arr.length; i++) {
    if (visited[i] || arr[i] === sortedArr[i]) continue;

    let cycleSize = 0;
    let j = i;

    while (!visited[j]) {
      visited[j] = true;
      j = indexMap.get(sortedArr[j]);
      cycleSize++;
    }

    if (cycleSize > 1) {
      swaps += cycleSize - 1;
    }
  }

  return swaps;
}

function lilysHomework(arr) {
  let sortedArr = [...arr].sort((a, b) => a - b);
  let reversedArr = [...sortedArr].reverse();

  return Math.min(countSwaps(arr, sortedArr), countSwaps(arr, reversedArr));
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  const result = lilysHomework(arr);

  ws.write(result + "\n");

  ws.end();
}
