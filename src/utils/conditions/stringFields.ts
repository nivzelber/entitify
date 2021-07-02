import { ParsedQs } from "qs";
import { Equal, FindOperator, ILike, Like, Not } from "typeorm";

export const getStringsConditions = (stringFields: string[], query: ParsedQs) => {
  const conditions: Record<typeof stringFields[number], FindOperator<any>>[] = [];

  stringFields.forEach(stringField => {
    let condition: null | FindOperator<any> = null;
    if (query[stringField]) {
      condition = Equal(query[stringField]);
    } else if (query[stringField + "_eq"]) {
      condition = Equal(query[stringField + "_eq"]);
    } else if (query[stringField + "_ne"]) {
      condition = Not(Equal(query[stringField + "_ne"]));
    } else if (query[stringField + "_sw"]) {
      condition = ILike(`${query[stringField + "_sw"]}%`);
    } else if (query[stringField + "_sws"]) {
      condition = Like(`${query[stringField + "_sw"]}%`);
    } else if (query[stringField + "_ew"]) {
      condition = ILike(`%${query[stringField + "_ew"]}`);
    } else if (query[stringField + "_ews"]) {
      condition = Like(`%${query[stringField + "_ew"]}`);
    } else if (query[stringField + "_contains"]) {
      condition = ILike("%" + query[stringField + "_contains"] + "%");
    } else if (query[stringField + "_containss"]) {
      condition = Like("%" + query[stringField + "_containss"] + "%");
    }

    if (condition) {
      conditions.push({ [stringField]: condition });
    }
  });

  return conditions;
};
