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
 * Complete the 'weightedUniformStrings' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER_ARRAY queries
 */

function weightedUniformStrings(s, queries) {
  const weights = new Set();
  let currentWeight = 0;
  let previousChar = "";

  for (const char of s) {
    const charWeight = char.charCodeAt(0) - 96;
    if (char === previousChar) {
      currentWeight += charWeight;
    } else {
      currentWeight = charWeight;
      previousChar = char;
    }
    weights.add(currentWeight);
  }

  return queries.map((query) => (weights.has(query) ? "Yes" : "No"));
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const queriesCount = parseInt(readLine().trim(), 10);

  let queries = [];

  for (let i = 0; i < queriesCount; i++) {
    const queriesItem = parseInt(readLine().trim(), 10);
    queries.push(queriesItem);
  }

  const result = weightedUniformStrings(s, queries);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
