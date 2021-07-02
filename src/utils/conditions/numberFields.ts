import { ParsedQs } from "qs";
import { FindOperator, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual } from "typeorm";

export const getNumbersConditions = (numberFields: string[], query: ParsedQs) => {
  const conditions: Record<typeof numberFields[number], FindOperator<any>>[] = [];

  numberFields.forEach(numberField => {
    let condition: null | FindOperator<any> = null;
    if (query[numberField + "_lt"]) {
      condition = LessThan(query[numberField + "_lt"]);
    } else if (query[numberField + "_lte"]) {
      condition = LessThanOrEqual(query[numberField + "_lte"]);
    } else if (query[numberField + "_mt"]) {
      condition = MoreThan(query[numberField + "_mt"]);
    } else if (query[numberField + "_mte"]) {
      condition = MoreThanOrEqual(query[numberField + "_mte"]);
    }

    if (condition) {
      conditions.push({ [numberField]: condition });
    }
  });

  return conditions;
};
