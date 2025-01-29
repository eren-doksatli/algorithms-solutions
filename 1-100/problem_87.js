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
 * Complete the 'gemstones' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY arr as parameter.
 */

function gemstones(arr) {
  const alphabetSet = new Set("abcdefghijklmnopqrstuvwxyz");
  let commonElements = alphabetSet;

  for (const str of arr) {
    const strSet = new Set(str);
    commonElements = new Set(
      [...commonElements].filter((ch) => strSet.has(ch))
    );
  }

  return commonElements.size;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  let arr = [];

  for (let i = 0; i < n; i++) {
    const arrItem = readLine();
    arr.push(arrItem);
  }

  const result = gemstones(arr);

  ws.write(result + "\n");

  ws.end();
}
