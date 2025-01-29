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
 * Complete the 'biggerIsGreater' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING w as parameter.
 */

function biggerIsGreater(w) {
  let arr = w.split("");
  let i = arr.length - 2;

  while (i >= 0 && arr[i] >= arr[i + 1]) {
    i--;
  }

  if (i === -1) {
    return "no answer";
  }

  let j = arr.length - 1;
  while (arr[j] <= arr[i]) {
    j--;
  }

  [arr[i], arr[j]] = [arr[j], arr[i]];
  let left = arr.slice(0, i + 1);
  let right = arr.slice(i + 1).reverse();

  return left.concat(right).join("");
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const T = parseInt(readLine().trim(), 10);

  for (let TItr = 0; TItr < T; TItr++) {
    const w = readLine();

    const result = biggerIsGreater(w);

    ws.write(result + "\n");
  }

  ws.end();
}
