"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on("end", (_) => {
  inputString = inputString
    .replace(/\s*$/, "")
    .split("\n")
    .map((str) => str.replace(/\s*$/, ""));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the xorSequence function below.
function xorSequence(l, r) {
  function getXor(n) {
    const remainder = n % 4;
    if (remainder === 0) return n;
    if (remainder === 1) return 1;
    if (remainder === 2) return n + 1;
    return 0;
  }

  function calculateXorSequence(n) {
    if (n === 0) return 0;
    const remainder = n % 4;
    const pattern = [n, 1, n + 1, 0];
    return getXor(Math.floor(n / 4) * 4) ^ pattern[remainder];
  }

  return calculateXorSequence(r) ^ calculateXorSequence(l - 1);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const lr = readLine().split(" ");

    const l = parseInt(lr[0], 10);

    const r = parseInt(lr[1], 10);

    let result = xorSequence(l, r);

    ws.write(result + "\n");
  }

  ws.end();
}
