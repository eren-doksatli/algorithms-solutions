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
 * Complete the 'encryption' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function encryption(s) {
  s = s.replace(/\s+/g, "");
  let length = s.length;
  let rows = Math.floor(Math.sqrt(length));
  let cols = Math.ceil(Math.sqrt(length));

  if (rows * cols < length) {
    rows++;
  }

  let result = [];
  for (let i = 0; i < cols; i++) {
    let word = "";
    for (let j = i; j < length; j += cols) {
      word += s[j];
    }
    result.push(word);
  }

  return result.join(" ");
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const result = encryption(s);

  ws.write(result + "\n");

  ws.end();
}
