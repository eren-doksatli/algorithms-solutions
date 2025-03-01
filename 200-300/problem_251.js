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
 * Complete the 'redJohn' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER n as parameter.
 */

function redJohn(n) {
  if (n < 4) {
    return 0;
  }

  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 1;
  dp[3] = 1;

  for (let i = 4; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 4];
  }

  const totalWalls = dp[n];

  function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  let primeCount = 0;
  for (let i = 2; i <= totalWalls; i++) {
    if (isPrime(i)) {
      primeCount++;
    }
  }

  return primeCount;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine().trim(), 10);

    const result = redJohn(n);

    ws.write(result + "\n");
  }

  ws.end();
}
