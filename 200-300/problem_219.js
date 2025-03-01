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
 * Complete the 'quickestWayUp' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY ladders
 *  2. 2D_INTEGER_ARRAY snakes
 */

function quickestWayUp(ladders, snakes) {
  const board = Array(101)
    .fill(null)
    .map((_, i) => i);
  const visited = Array(101).fill(false);

  ladders.forEach(([start, end]) => (board[start] = end));
  snakes.forEach(([start, end]) => (board[start] = end));

  const queue = [[1, 0]];
  visited[1] = true;

  while (queue.length > 0) {
    const [position, moves] = queue.shift();
    if (position === 100) return moves;

    for (let i = 1; i <= 6; i++) {
      let nextPos = position + i;
      if (nextPos <= 100 && !visited[board[nextPos]]) {
        visited[board[nextPos]] = true;
        queue.push([board[nextPos], moves + 1]);
      }
    }
  }

  return -1;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine().trim(), 10);

    let ladders = Array(n);

    for (let i = 0; i < n; i++) {
      ladders[i] = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((laddersTemp) => parseInt(laddersTemp, 10));
    }

    const m = parseInt(readLine().trim(), 10);

    let snakes = Array(m);

    for (let i = 0; i < m; i++) {
      snakes[i] = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((snakesTemp) => parseInt(snakesTemp, 10));
    }

    const result = quickestWayUp(ladders, snakes);

    ws.write(result + "\n");
  }

  ws.end();
}
