export * from "./solutions/types";
export * from "./solutions/useCases";
export * from "./solutions/industries";
export * from "./solutions/categories";

import { useCaseSolutions } from "./solutions/useCases";
import { industrySolutions } from "./solutions/industries";
import { moreCategorySolutions } from "./solutions/categories";
import { SolutionItem } from "./solutions/types";

export const allSolutions: SolutionItem[] = [
  ...useCaseSolutions,
  ...industrySolutions,
  ...moreCategorySolutions
];
