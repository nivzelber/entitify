import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

import { Field, FieldNameTypeTuple } from "../types/field.type";
import { nullGuard } from "../types/null-guard";

const typeNameIndex = 9; // match syntax of `function Type()`

/**
 * get all model fields by type
 * @param columnMetadata model ownColumns
 * @returns array of objects that map a field name to it's type
 * @example
 * Entity()
 * class User {
 *  Field()
 *  age: number;
 *
 *  Field()
 *  name: string;
 * }
 * const { ownColumns } = getConnection().getMetadata(User)
 * getFields(ownColumns) // returns:
 * // [
 * //  { name: "age", type: "Number"},
 * //  { name: "name", type: "String"},
 * // ]
 *
 */
export const getFields = (columnMetadata: ColumnMetadata[]): FieldNameTypeTuple[] => {
  return columnMetadata
    .map(({ propertyName, type }): FieldNameTypeTuple | undefined => {
      const typeString = type.toString();
      if (["datetime", "datetime2"].includes(typeString)) {
        return { name: propertyName, type: "Date" };
      } else {
        const typeFromFunction = typeString.slice(typeNameIndex, typeString.indexOf("(")) as Field;
        if (["String", "Number", "Boolean"].includes(typeFromFunction)) {
          return { name: propertyName, type: typeFromFunction };
        }
      }
    })
    .filter(nullGuard);
};
