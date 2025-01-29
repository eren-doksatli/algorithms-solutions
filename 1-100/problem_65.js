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
 * Complete the 'surfaceArea' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY A as parameter.
 */

function surfaceArea(A) {
  let totalSurfaceArea = 0;

  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      let height = A[i][j];

      totalSurfaceArea += 2;

      if (i === 0) totalSurfaceArea += height;
      else totalSurfaceArea += Math.max(0, height - A[i - 1][j]);

      if (i === A.length - 1) totalSurfaceArea += height;
      else totalSurfaceArea += Math.max(0, height - A[i + 1][j]);

      if (j === 0) totalSurfaceArea += height;
      else totalSurfaceArea += Math.max(0, height - A[i][j - 1]);

      if (j === A[i].length - 1) totalSurfaceArea += height;
      else totalSurfaceArea += Math.max(0, height - A[i][j + 1]);
    }
  }

  return totalSurfaceArea;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const H = parseInt(firstMultipleInput[0], 10);

  const W = parseInt(firstMultipleInput[1], 10);

  let A = Array(H);

  for (let i = 0; i < H; i++) {
    A[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((ATemp) => parseInt(ATemp, 10));
  }

  const result = surfaceArea(A);

  ws.write(result + "\n");

  ws.end();
}
