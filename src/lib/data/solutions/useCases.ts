/**
 * useCases.ts — Solution items data index
 * Split into useCases/ submodules to keep individual files < 200 lines.
 */

import { SolutionItem } from "./types";
import { marketingAndSupportCases } from "./useCases/marketingAndSupport";
import { leadGenAndNotificationsCases } from "./useCases/leadGenAndNotifications";

export const useCaseSolutions: SolutionItem[] = [
  ...marketingAndSupportCases,
  ...leadGenAndNotificationsCases,
];
