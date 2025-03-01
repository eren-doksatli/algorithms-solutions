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
 * Complete the 'knightlOnAChessboard' function below.
 *
 * The function is expected to return a 2D_INTEGER_ARRAY.
 * The function accepts INTEGER n as parameter.
 */

function knightlOnAChessboard(n) {
  function bfs(a, b) {
    let queue = [[0, 0, 0]];
    let visited = Array.from({ length: n }, () => Array(n).fill(false));
    visited[0][0] = true;

    let moves = [
      [a, b],
      [a, -b],
      [-a, b],
      [-a, -b],
      [b, a],
      [b, -a],
      [-b, a],
      [-b, -a],
    ];

    while (queue.length) {
      let [x, y, d] = queue.shift();
      if (x === n - 1 && y === n - 1) return d;

      for (let [dx, dy] of moves) {
        let nx = x + dx,
          ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < n && ny < n && !visited[nx][ny]) {
          visited[nx][ny] = true;
          queue.push([nx, ny, d + 1]);
        }
      }
    }

    return -1;
  }

  let result = Array.from({ length: n - 1 }, () => Array(n - 1).fill(0));

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < n; j++) {
      result[i - 1][j - 1] = bfs(i, j);
    }
  }

  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const result = knightlOnAChessboard(n);

  ws.write(result.map((x) => x.join(" ")).join("\n") + "\n");

  ws.end();
}
