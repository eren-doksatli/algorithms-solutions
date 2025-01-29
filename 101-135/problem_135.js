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
 * Complete the 'twoPluses' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function twoPluses(grid) {
  function getMaxSize(x, y) {
    let size = 0;
    while (
      x - size >= 0 &&
      x + size < grid.length &&
      y - size >= 0 &&
      y + size < grid[0].length &&
      grid[x - size][y] === "G" &&
      grid[x + size][y] === "G" &&
      grid[x][y - size] === "G" &&
      grid[x][y + size] === "G"
    ) {
      size++;
    }
    return size - 1;
  }

  function getCells(x, y, s) {
    let cells = new Set();
    for (let k = 0; k <= s; k++) {
      cells.add(`${x - k},${y}`);
      cells.add(`${x + k},${y}`);
      cells.add(`${x},${y - k}`);
      cells.add(`${x},${y + k}`);
    }
    return cells;
  }

  let pluses = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "G") {
        let maxSize = getMaxSize(i, j);
        for (let s = 0; s <= maxSize; s++) {
          pluses.push([i, j, s]);
        }
      }
    }
  }

  let maxArea = 0;
  for (let i = 0; i < pluses.length; i++) {
    for (let j = i + 1; j < pluses.length; j++) {
      let [x1, y1, s1] = pluses[i];
      let [x2, y2, s2] = pluses[j];

      let cells1 = getCells(x1, y1, s1);
      let cells2 = getCells(x2, y2, s2);

      let isOverlapping = [...cells1].some((cell) => cells2.has(cell));
      if (!isOverlapping) {
        let area1 = 1 + s1 * 4;
        let area2 = 1 + s2 * 4;
        maxArea = Math.max(maxArea, area1 * area2);
      }
    }
  }

  return maxArea;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const m = parseInt(firstMultipleInput[1], 10);

  let grid = [];

  for (let i = 0; i < n; i++) {
    const gridItem = readLine();
    grid.push(gridItem);
  }

  const result = twoPluses(grid);

  ws.write(result + "\n");

  ws.end();
}
