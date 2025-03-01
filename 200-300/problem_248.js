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
 * Complete the 'morganAndString' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function morganAndString(a, b) {
  let result = "";
  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      result += a[i];
      i++;
    } else if (a[i] > b[j]) {
      result += b[j];
      j++;
    } else {
      let k = 0;
      while (i + k < a.length && j + k < b.length && a[i + k] === b[j + k]) {
        k++;
      }

      if (i + k === a.length) {
        result += b[j];
        j++;
      } else if (j + k === b.length) {
        result += a[i];
        i++;
      } else if (a[i + k] < b[j + k]) {
        result += a[i];
        i++;
      } else {
        result += b[j];
        j++;
      }
    }
  }

  while (i < a.length) {
    result += a[i];
    i++;
  }

  while (j < b.length) {
    result += b[j];
    j++;
  }

  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const a = readLine();

    const b = readLine();

    const result = morganAndString(a, b);

    ws.write(result + "\n");
  }

  ws.end();
}
