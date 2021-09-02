import { ILike, Like } from "typeorm";

import { makeConditionGetter } from "./make-condition-getter";

export const getStringsConditions = makeConditionGetter([
  { filter: "sw", getFindOperator: queryValue => ILike(`${queryValue}%`) },
  { filter: "sws", getFindOperator: queryValue => Like(`${queryValue}%`) },
  { filter: "ew", getFindOperator: queryValue => ILike(`%${queryValue}`) },
  { filter: "ews", getFindOperator: queryValue => Like(`%${queryValue}`) },
  { filter: "contains", getFindOperator: queryValue => ILike("%" + queryValue + "%") },
  { filter: "containss", getFindOperator: queryValue => Like("%" + queryValue + "%") }
]);
