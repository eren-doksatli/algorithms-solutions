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
 * Complete the 'cavityMap' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function cavityMap(grid) {
  let result = [...grid];
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      let current = grid[i][j];
      if (
        current > grid[i - 1][j] &&
        current > grid[i + 1][j] &&
        current > grid[i][j - 1] &&
        current > grid[i][j + 1]
      ) {
        result[i] = result[i].slice(0, j) + "X" + result[i].slice(j + 1);
      }
    }
  }
  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  let grid = [];

  for (let i = 0; i < n; i++) {
    const gridItem = readLine();
    grid.push(gridItem);
  }

  const result = cavityMap(grid);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
