import { ParsedQs } from "qs";
import { FindOperator } from "typeorm";

import { pluck } from "../pluck";
import { Field, FieldNameTypeTuple } from "../types/field.type";

import { getGeneralConditions, getNumbersAndDatesConditions, getStringsConditions } from "./";

const getName = pluck("name");
const typeEquals = (type: Field) => (field: { type: Field }) => field.type === type;

export interface GetWhereConditionsProps {
  query: ParsedQs;
  fields: FieldNameTypeTuple[];
  and?: boolean;
}

export const getWhereConditions = ({ query, fields, and = false }: GetWhereConditionsProps) => {
  let conditions: Record<string, FindOperator<any>>[] = [];

  const generalConditions = getGeneralConditions(fields.map(getName), query);
  conditions.push(...generalConditions); // using concat does not work here

  const stringConditions = getStringsConditions(
    fields.filter(typeEquals("String")).map(getName),
    query
  );
  conditions.push(...stringConditions);

  const numberConditions = getNumbersAndDatesConditions(
    fields.filter(typeEquals("Number")).map(getName),
    query
  );
  conditions.push(...numberConditions);

  const dateConditions = getNumbersAndDatesConditions(
    fields.filter(typeEquals("Date")).map(getName),
    query
  );
  conditions.push(...dateConditions);

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
