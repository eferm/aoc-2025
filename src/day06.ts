import { readFileSync } from "node:fs";

const input = readFileSync("inputs/day06.txt", "utf-8").slice(0, -1);

const operator = {
  "+": (a: number, b: number) => a + b,
  "*": (a: number, b: number) => a * b,
};

function part1(input: string): number {
  const rows = input.split("\n").map((row) => row.trim().split(/\s+/));
  const [nums, ops] = [
    rows.slice(0, -1).map((row) => row.map(Number)),
    rows.at(-1) as ("+" | "*")[],
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
  const [nums, ops] = [rows.slice(0, -1), rows.at(-1)!];
  return (
    ops
      // create (operator, vertical number) tuples from columns
      .map<["+" | "*" | null, number]>((char, i) => [
        char === "+" || char === "*" ? char : null,
        +nums
          .map((row) => row.at(i)) // get i:th column
          .flat()
          .join(""),
      ])
      // restructure into (operator + list of numbers) tuples
      .reduce(
        (acc, [op, val]) => {
          if (op === "+" || op === "*") {
            acc.push([op, [val]]); // start a new group
          } else if (val > 0) {
            acc.at(-1)?.[1].push(val); // push into the last group's list
          }
          return acc;
        },
        [] as ["+" | "*", number[]][],
      )
      // apply operator onto list of numbers
      .map(([op, vals]) => vals.reduce((sum, val) => operator[op](sum, val)))
      .reduce((sum, val) => sum + val)
  );
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
