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
 * Complete the 'luckBalance' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. 2D_INTEGER_ARRAY contests
 */

function luckBalance(k, contests) {
  let luck = 0;
  let importantContests = [];

  // Separate important and unimportant contests
  for (let [luckValue, importance] of contests) {
    if (importance === 1) {
      importantContests.push(luckValue);
    } else {
      luck += luckValue;
    }
  }

  // Sort important contests in descending order
  importantContests.sort((a, b) => b - a);

  // Add the luck from the k highest important contests
  for (let i = 0; i < importantContests.length; i++) {
    if (i < k) {
      luck += importantContests[i];
    } else {
      luck -= importantContests[i];
    }
  }

  return luck;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const k = parseInt(firstMultipleInput[1], 10);

  let contests = Array(n);

  for (let i = 0; i < n; i++) {
    contests[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((contestsTemp) => parseInt(contestsTemp, 10));
  }

  const result = luckBalance(k, contests);

  ws.write(result + "\n");

  ws.end();
}
