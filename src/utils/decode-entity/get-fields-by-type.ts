import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

import { nullGuard } from "../types/null-guard";

const typeNameIndex = 9; // match syntax of `function Type()`

export type FieldType = "String" | "Number" | "Boolean" | "Date";
export interface FieldNameTypeTuple {
  name: string;
  type: FieldType;
}

export const getFields = (columnMetadata: ColumnMetadata[]): FieldNameTypeTuple[] => {
  return columnMetadata
    .map(({ propertyName, type }): FieldNameTypeTuple | undefined => {
      const typeString = type.toString();
      if (["datetime", "datetime2"].includes(typeString)) {
        return { name: propertyName, type: "Date" };
      } else {
        const typeFromFunction = typeString.slice(
          typeNameIndex,
          typeString.indexOf("(")
        ) as FieldType;
        if (["String", "Number", "Boolean"].includes(typeFromFunction)) {
          return { name: propertyName, type: typeFromFunction };
        }
      }
    })
    .filter(nullGuard);
};
