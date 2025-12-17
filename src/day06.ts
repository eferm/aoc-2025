import { readFileSync } from "node:fs";

const input = readFileSync("inputs/day06.txt", "utf-8").slice(0, -1);

const operator = {
  "+": (a: number, b: number) => a + b,
  "*": (a: number, b: number) => a * b,
};

function part1(input: string): number {
  const rows = input.split("\n").map((row) => row.trim().split(/\s+/));
  const [nums, ops] = [rows.slice(0, -1), rows.at(-1)! as ("+" | "*")[]];
  return ops.reduce((prev, op, i) => {
    return prev + nums.map((row) => Number(row.at(i))).reduce(operator[op]);
  }, 0);
}

function transpose(matrix: any[][]) {
  return matrix[0]?.map((_, i) => matrix.map((row) => row[i]));
}

function part2(input: string): number {
  const rows = input.split("\n").map((row) => row.split(""));
  // transpose -> process rows top-down equiv to process cols left-right
  const nums = transpose(rows.slice(0, -1))!
    .map((row) => row.join("").trim() || "|") // all empty col as delimiter
    .join(" ")
    .split("|")
    .map((line) => line.trim().split(/ +/).map(Number));
  const ops = rows.at(-1)!.filter((c) => c === "+" || c === "*");
  return ops.reduce((prev, op, i) => {
    const num = nums.at(i)!.reduce(operator[op]);
    return prev + num;
  }, 0);
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
