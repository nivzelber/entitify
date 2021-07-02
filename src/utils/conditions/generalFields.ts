import { ParsedQs } from "qs";
import { Equal, FindOperator, Not } from "typeorm";

export const getGeneralConditions = (generalFields: string[], query: ParsedQs) => {
  const conditions: Record<typeof generalFields[number], FindOperator<any>>[] = [];

  generalFields.forEach(generalField => {
    let condition: null | FindOperator<any> = null;
    if (query[generalField]) {
      condition = Equal(query[generalField]);
    } else if (query[generalField + "_eq"]) {
      condition = Equal(query[generalField + "_eq"]);
    } else if (query[generalField + "_ne"]) {
      condition = Not(Equal(query[generalField + "_ne"]));
    }

    if (condition) {
      conditions.push({ [generalField]: condition });
    }
  });

  return conditions;
};
