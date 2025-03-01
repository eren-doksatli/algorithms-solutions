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
 * Complete the 'abbreviation' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 * 1. STRING a
 * 2. STRING b
 */

function abbreviation(a, b) {
  const n = a.length;
  const m = b.length;
  const dp = Array(n + 1)
    .fill(null)
    .map(() => Array(m + 1).fill(false));

  dp[0][0] = true;

  for (let i = 1; i <= n; i++) {
    dp[i][0] = dp[i - 1][0] && a[i - 1] >= "a" && a[i - 1] <= "z";
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (a[i - 1].toUpperCase() === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] || dp[i - 1][j];
      } else if (a[i - 1] >= "a" && a[i - 1] <= "z") {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n][m] ? "YES" : "NO";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const a = readLine();

    const b = readLine();

    const result = abbreviation(a, b);

    ws.write(result + "\n");
  }

  ws.end();
}
