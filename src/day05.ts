import { readFileSync } from "node:fs";

const input = readFileSync("inputs/day05.txt", "utf-8").trim();

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
  return (
    input
      .split("\n\n")
      .at(0)!
      .split("\n")
      .map((range) => range.split("-").map(Number) as [number, number])
      // sort to process left-most boundary first, then can truncate next left
      // boundary with previous right boundary
      .sort(([a], [b]) => a - b)
      .reduce(
        ([sum, max], [from, to]) => {
          return to < max
            ? [sum, max] // can skip since we have already processed up to max
            : [sum + (to - Math.max(from, max) + 1), to + 1];
        },
        [0, 0], // (total fresh, maximum right boundary seen)
      )
      .at(0)!
  );
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
