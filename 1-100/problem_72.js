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
 * Complete the 'minimumNumber' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING password
 */

function minimumNumber(n, password) {
  let requiredCharacters = 0;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*()\-+]/.test(password);

  if (!hasLowerCase) requiredCharacters++;
  if (!hasUpperCase) requiredCharacters++;
  if (!hasNumber) requiredCharacters++;
  if (!hasSpecialCharacter) requiredCharacters++;

  return Math.max(requiredCharacters, 6 - n);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const password = readLine();

  const answer = minimumNumber(n, password);

  ws.write(answer + "\n");

  ws.end();
}
