import { ParsedQs } from "qs";
import { FindOperator } from "typeorm";

import {
  getGeneralConditions,
  getNumbersConditions,
  getStringsConditions
} from "../utils/conditions";

interface GetWhereConditionsProps {
  query: ParsedQs;
  stringFields?: string[];
  numberFields?: string[];
  and?: boolean;
}

export const getWhereConditions = ({
  query,
  stringFields = [],
  numberFields = [],
  and = false
}: GetWhereConditionsProps) => {
  let conditions: Record<string, FindOperator<any>>[] = [];

  const allFields = ([] as string[]).concat(stringFields).concat(numberFields);
  const generalConditions = getGeneralConditions(allFields, query);
  conditions.push(...generalConditions); // using concat does not work here

  const stringConditions = getStringsConditions(stringFields, query);
  conditions.push(...stringConditions);

  const numberConditions = getNumbersConditions(numberFields, query);
  conditions.push(...numberConditions);

  // joining conditions in case and was supplied
  if (and && conditions.length > 0) {
    const andConditions: Record<string, FindOperator<any>>[] = [conditions[0]];
    for (let i = 1; i < conditions.length; i++) {
      const currentCondition = conditions[i];
      const fieldName = Object.keys(currentCondition)[0];
      if (andConditions[0].hasOwnProperty(fieldName)) {
        andConditions.push(currentCondition);
      } else {
        andConditions[0][fieldName] = currentCondition[fieldName];
      }
    }

    conditions = andConditions;
  }

  return conditions;
};
