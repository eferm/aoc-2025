import { readFileSync } from "node:fs";

const input = readFileSync("inputs/day06.txt", "utf-8").trim();
// const input = `
// 123 328  51 64
//  45 64  387 23
//   6 98  215 314
// *   +   *   +  `.trim();
// console.log(input);

const operator = {
  "+": (a: number, b: number) => a + b,
  "*": (a: number, b: number) => a * b,
};

function part1(input: string): number {
  const rows = input.split("\n").map((row) => row.trim().split(/\s+/));
  const [nums, ops] = [
    rows.slice(0, -1).map((row) => row.map(Number)),
    rows.slice(-1).flat() as ("+" | "*")[],
  ];
  return ops
    .map((op, i) =>
      nums
        .map((row) => row.at(i)!) // get column
        .reduce((sum, val) => operator[op](sum, val)),
    )
    .reduce((sum, val) => sum + val);
}

function part2(input: string): number {
  return 0;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
