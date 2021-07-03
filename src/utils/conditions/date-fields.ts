import { ParsedQs } from "qs";
import { FindOperator, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual } from "typeorm";

export const getDatesConditions = (dateFields: string[], query: ParsedQs) => {
  const conditions: Record<typeof dateFields[number], FindOperator<any>>[] = [];

  dateFields.forEach(dateField => {
    let condition: null | FindOperator<any> = null;
    if (query[dateField + "_lt"]) {
      condition = LessThan(query[dateField + "_lt"]);
    } else if (query[dateField + "_lte"]) {
      condition = LessThanOrEqual(query[dateField + "_lte"]);
    } else if (query[dateField + "_mt"]) {
      condition = MoreThan(query[dateField + "_mt"]);
    } else if (query[dateField + "_mte"]) {
      condition = MoreThanOrEqual(query[dateField + "_mte"]);
    }

    if (condition) {
      conditions.push({ [dateField]: condition });
    }
  });

  return conditions;
};
