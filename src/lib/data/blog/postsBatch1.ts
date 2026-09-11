import { BlogPost } from "./types";
import { postsBatch1Part1 } from "./postsBatch1.part1";
import { postsBatch1Part2 } from "./postsBatch1.part2";

export const postsBatch1: BlogPost[] = [
  ...postsBatch1Part1,
  ...postsBatch1Part2,
];
