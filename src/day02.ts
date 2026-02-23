import { readFileSync } from "node:fs";

const input = readFileSync("inputs/day02.txt", "utf-8").trim();

function range(start: number, stop: number): number[] {
  return Array.from({ length: stop - start + 1 }, (_, i) => start + i);
}

function expandRanges(input: string): number[] {
  return input
    .split(",")
    .map((r) => r.split("-").map(Number) as [number, number])
    .flatMap(([first, last]) => range(first, last));
}

function part1(input: string) {
  return expandRanges(input)
    .filter((i) => {
      const s = String(i);
      return s.slice(0, s.length / 2).repeat(2) === s;
    })
    .reduce((sum, num) => sum + num, 0);
}

function part2(input: string) {
  return expandRanges(input)
    .filter((i) => {
      const s = String(i);
      return range(1, s.length / 2).some(
        (end) => s.slice(0, end).repeat(s.length / end) === s,
      );
    })
    .reduce((sum, num) => sum + num, 0);
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
