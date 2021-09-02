import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual } from "typeorm";

import { makeConditionGetter } from "./make-condition-getter";

// as of now, numbers and date conditions happens to be the exact same
export const getNumbersAndDatesConditions = makeConditionGetter([
  { filter: "lt", getFindOperator: LessThan },
  { filter: "lte", getFindOperator: LessThanOrEqual },
  { filter: "mt", getFindOperator: MoreThan },
  { filter: "mte", getFindOperator: MoreThanOrEqual }
]);
