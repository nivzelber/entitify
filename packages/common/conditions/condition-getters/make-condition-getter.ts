import { ParsedQs } from "qs";
import { FindOperator } from "typeorm";

interface FilterFindOperatorPair {
  filter: string;
  getFindOperator: (queryValue: any) => FindOperator<any>;
  omitFilter?: boolean;
}

export const makeConditionGetter =
  (filters: FilterFindOperatorPair[]) => (fields: string[], query: ParsedQs) => {
    const conditions: Record<typeof fields[number], FindOperator<any>>[] = [];

    fields.forEach(field => {
      filters.forEach(({ filter, getFindOperator, omitFilter = false }) => {
        const fieldWithFilterKey = omitFilter ? field : field + "_" + filter;
        if (query[fieldWithFilterKey]) {
          const condition = getFindOperator(query[fieldWithFilterKey]);
          conditions.push({ [field]: condition });
        }
      });
    });

    return conditions;
  };
