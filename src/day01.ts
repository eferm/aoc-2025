import { readFileSync } from "fs";

const input = readFileSync("inputs/day01.txt", "utf-8").trim();
const START = 50;

function part1(input: string) {
  return input
    .split("\n")
    .map<[string, number]>((line) => [
      line.match(/[A-Z]/)![0],
      parseInt(line.match(/\d+/)![0]),
    ])
    .reduce(
      (acc, [dir, num]) => {
        const prev = acc[acc.length - 1]!;
        const delta = dir === "L" ? -num : +num;
        const next = (((prev + delta) % 100) + 100) % 100;
        return [...acc, next];
      },
      [START],
    )
    .filter((n) => n === 0).length;
}

function part2(input: string) {
  return input
    .split("\n")
    .map<[string, number]>((line) => [
      line.match(/[A-Z]/)![0],
      parseInt(line.match(/\d+/)![0]),
    ])
    .reduce<[number, number]>(
      (acc, [dir, num]) => {
        let [next, zero] = acc;
        const delta = dir === "L" ? -1 : 1;
        for (let i = 0; i < num; i++) {
          next = (((next + delta) % 100) + 100) % 100;
          if (next === 0) zero++;
        }
        return [next, zero];
      },
      [START, 0],
    )[1];
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
