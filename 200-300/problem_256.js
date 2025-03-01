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
 * Complete the 'hanoi' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY posts as parameter.
 */

function hanoi(posts) {
  const n = posts.length;
  let dp = Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = 2 * dp[i - 1] + 1;
  }

  let result = 0;
  let currentPost = 1;

  for (let i = n - 1; i >= 0; i--) {
    if (posts[i] !== currentPost) {
      let targetPost = 6 - currentPost - posts[i];
      result += dp[i];
      currentPost = targetPost;
    }
  }

  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const loc = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((locTemp) => parseInt(locTemp, 10));

  const res = hanoi(loc);

  ws.write(res + "\n");

  ws.end();
}
