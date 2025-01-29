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
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */

function queensAttack(n, k, r_q, c_q, obstacles) {
  let directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ];

  let count = 0;

  for (let [dx, dy] of directions) {
    let x = r_q,
      y = c_q;

    while (true) {
      x += dx;
      y += dy;

      if (x < 1 || x > n || y < 1 || y > n) break;

      let isBlocked = obstacles.some(([ox, oy]) => ox === x && oy === y);
      if (isBlocked) break;

      count++;
    }
  }

  return count;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const k = parseInt(firstMultipleInput[1], 10);

  const secondMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const r_q = parseInt(secondMultipleInput[0], 10);

  const c_q = parseInt(secondMultipleInput[1], 10);

  let obstacles = Array(k);

  for (let i = 0; i < k; i++) {
    obstacles[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((obstaclesTemp) => parseInt(obstaclesTemp, 10));
  }

  const result = queensAttack(n, k, r_q, c_q, obstacles);

  ws.write(result + "\n");

  ws.end();
}
