import { readFileSync } from "node:fs";

const input = readFileSync("inputs/day05.txt", "utf-8").trim();
// const input = `
// 3-5
// 10-14
// 16-20
// 12-18

// 1
// 5
// 8
// 11
// 17
// 32`.trim();
// console.log(input, "\n--");

function part1(input: string): number {
  const [fresh, avail] = input
    .split("\n\n")
    .map((half) => half.split("\n").map((x) => x.split("-").map(Number)));
  return avail!
    .flat()
    .map((x) => fresh!.some(([from, to]) => x >= from! && x <= to!))
    .filter(Boolean).length;
}

function part2(input: string): number {
  return input
    .split("\n\n")
    .at(0)!
    .split("\n")
    .map((range) => range.split("-").map(Number) as [number, number])
    .sort(([a], [b]) => a - b)
    .reduce(
      ([sum, max], [from, to]) => {
        const incr = Math.max(to - Math.max(from, max) + 1, 0);
        return [sum + incr, Math.max(to + 1, max)];
      },
      [0, 0],
    )
    .at(0)!;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
