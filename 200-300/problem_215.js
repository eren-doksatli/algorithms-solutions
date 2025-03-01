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
 * Complete the 'countLuck' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING_ARRAY matrix
 *  2. INTEGER k
 */

function countLuck(matrix, k) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let start,
    rows = matrix.length,
    cols = matrix[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === "M") {
        start = [i, j];
        break;
      }
    }
  }

  function isValid(x, y) {
    return x >= 0 && y >= 0 && x < rows && y < cols && matrix[x][y] !== "X";
  }

  function bfs(start) {
    let queue = [[start[0], start[1], 0]];
    let visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    visited[start[0]][start[1]] = true;

    while (queue.length > 0) {
      let [x, y, waves] = queue.shift();
      if (matrix[x][y] === "*") return waves;

      let possiblePaths = [];
      for (let [dx, dy] of directions) {
        let nx = x + dx,
          ny = y + dy;
        if (isValid(nx, ny) && !visited[nx][ny]) {
          visited[nx][ny] = true;
          possiblePaths.push([nx, ny, waves]);
        }
      }

      if (possiblePaths.length > 1) waves++;
      for (let path of possiblePaths) queue.push([path[0], path[1], waves]);
    }
    return -1;
  }

  return bfs(start) === k ? "Impressed" : "Oops!";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let matrix = [];

    for (let i = 0; i < n; i++) {
      const matrixItem = readLine();
      matrix.push(matrixItem);
    }

    const k = parseInt(readLine().trim(), 10);

    const result = countLuck(matrix, k);

    ws.write(result + "\n");
  }

  ws.end();
}
