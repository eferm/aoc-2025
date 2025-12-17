import { readFileSync } from "node:fs";

const input = readFileSync("inputs/day06.txt", "utf-8").slice(0, -1);
// const input = `123 328  51 64
//  45 64  387 23
//   6 98  215 314
// *   +   *   +  `;
console.log(input);

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
  const rows = input.split("\n").map((row) => row.split(""));
  return rows
    .at(-1)!
    .map<["+" | "*" | null, number]>((char, i) => [
      char === "+" || char === "*" ? char : null,
      +rows
        .slice(0, -1)
        .map((row) => row.slice(i, i + 1))
        .flat()
        .join(""),
    ])
    .reduce(
      (acc, [op, val]) => {
        if (op === "+" || op === "*") {
          // start a new group
          acc.push([op, [val]]);
        } else if (val > 0) {
          // push into the last group's number list
          acc.at(-1)?.[1].push(val);
        }
        return acc;
      },
      [] as ["+" | "*", number[]][],
    )
    .map(([op, vals]) => vals.reduce((sum, val) => operator[op](sum, val)))
    .reduce((sum, val) => sum + val);
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
