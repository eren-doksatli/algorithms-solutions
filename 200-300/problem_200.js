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
 * Complete the 'organizingContainers' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts 2D_INTEGER_ARRAY container as parameter.
 */

function organizingContainers(container) {
  let containerCapacity = Array(container.length).fill(0);
  let ballTypeCount = Array(container.length).fill(0);

  for (let i = 0; i < container.length; i++) {
    for (let j = 0; j < container.length; j++) {
      containerCapacity[i] += container[i][j];
      ballTypeCount[j] += container[i][j];
    }
  }

  containerCapacity.sort((a, b) => a - b);
  ballTypeCount.sort((a, b) => a - b);

  return JSON.stringify(containerCapacity) === JSON.stringify(ballTypeCount)
    ? "Possible"
    : "Impossible";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const n = parseInt(readLine().trim(), 10);

    let container = Array(n);

    for (let i = 0; i < n; i++) {
      container[i] = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((containerTemp) => parseInt(containerTemp, 10));
    }

    const result = organizingContainers(container);

    ws.write(result + "\n");
  }

  ws.end();
}
