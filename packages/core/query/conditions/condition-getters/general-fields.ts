import { Equal, Not } from "typeorm";

import { makeConditionGetter } from "./make-condition-getter";

export const getGeneralConditions = makeConditionGetter([
  { filter: "", getFindOperator: Equal, omitFilter: true },
  { filter: "eq", getFindOperator: Equal },
  { filter: "ne", getFindOperator: queryValue => Not(Equal(queryValue)) }
]);
