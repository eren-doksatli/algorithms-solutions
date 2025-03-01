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
 * Complete the 'connectedCell' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY matrix as parameter.
 */

function connectedCell(matrix) {
  let maxRegion = 0;
  let n = matrix.length;
  let m = matrix[0].length;

  function dfs(i, j) {
    if (i < 0 || j < 0 || i >= n || j >= m || matrix[i][j] === 0) {
      return 0;
    }

    matrix[i][j] = 0;
    let size = 1;

    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di !== 0 || dj !== 0) {
          size += dfs(i + di, j + dj);
        }
      }
    }

    return size;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === 1) {
        maxRegion = Math.max(maxRegion, dfs(i, j));
      }
    }
  }

  return maxRegion;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const m = parseInt(readLine().trim(), 10);

  let matrix = Array(n);

  for (let i = 0; i < n; i++) {
    matrix[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((matrixTemp) => parseInt(matrixTemp, 10));
  }

  const result = connectedCell(matrix);

  ws.write(result + "\n");

  ws.end();
}
