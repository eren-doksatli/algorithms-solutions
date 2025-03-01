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
 * Complete the 'permutationGame' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function permutationGame(arr) {
  const n = arr.length;
  const dp = Array(1 << n).fill(null);

  function solve(mask, currentArr) {
    if (dp[mask] !== null) {
      return dp[mask];
    }

    let canWin = false;
    for (let i = 0; i < currentArr.length; i++) {
      const nextArr = [];
      for (let j = 0; j < currentArr.length; j++) {
        if (i !== j) {
          nextArr.push(currentArr[j]);
        }
      }

      if (nextArr.length === 0 || !solve(mask | (1 << i), nextArr)) {
        canWin = true;
        break;
      }
    }

    return (dp[mask] = canWin);
  }

  return solve(0, arr) ? "WIN" : "LOSE";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const arrCount = parseInt(readLine().trim(), 10);

    const arr = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((arrTemp) => parseInt(arrTemp, 10));

    const result = permutationGame(arr);

    ws.write(result + "\n");
  }

  ws.end();
}
