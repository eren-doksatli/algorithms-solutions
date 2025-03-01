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
 * Complete the 'stringSimilarity' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function stringSimilarity(s) {
  const n = s.length;
  let similarity = n; // Similarity with the string itself

  for (let i = 1; i < n; i++) {
    let count = 0;
    for (let j = 0; i + j < n; j++) {
      if (s[j] === s[i + j]) {
        count++;
      } else {
        break;
      }
    }
    similarity += count;
  }

  return similarity;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const s = readLine();

    const result = stringSimilarity(s);

    ws.write(result + "\n");
  }

  ws.end();
}
