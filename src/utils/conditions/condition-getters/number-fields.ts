import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual } from "typeorm";

import { makeConditionGetter } from "./make-condition-getter";

export const getNumbersConditions = makeConditionGetter([
  { filter: "lt", getFindOperator: LessThan },
  { filter: "lte", getFindOperator: LessThanOrEqual },
  { filter: "mt", getFindOperator: MoreThan },
  { filter: "mte", getFindOperator: MoreThanOrEqual }
]);
