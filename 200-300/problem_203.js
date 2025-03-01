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
 * Complete the 'activityNotifications' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY expenditure
 *  2. INTEGER d
 */

function getMedian(counts, d) {
  let sum = 0;
  let median1 = 0,
    median2 = 0;
  let mid1 = Math.floor((d - 1) / 2);
  let mid2 = Math.ceil((d - 1) / 2);

  for (let i = 0; i < counts.length; i++) {
    sum += counts[i];

    if (sum > mid1 && median1 === 0) median1 = i;
    if (sum > mid2) {
      median2 = i;
      break;
    }
  }

  return (median1 + median2) / 2;
}

function activityNotifications(expenditure, d) {
  let notifications = 0;
  let counts = Array(201).fill(0);

  for (let i = 0; i < d; i++) {
    counts[expenditure[i]]++;
  }

  for (let i = d; i < expenditure.length; i++) {
    let median = getMedian(counts, d);

    if (expenditure[i] >= 2 * median) {
      notifications++;
    }

    counts[expenditure[i - d]]--;
    counts[expenditure[i]]++;
  }

  return notifications;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const d = parseInt(firstMultipleInput[1], 10);

  const expenditure = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((expenditureTemp) => parseInt(expenditureTemp, 10));

  const result = activityNotifications(expenditure, d);

  ws.write(result + "\n");

  ws.end();
}
