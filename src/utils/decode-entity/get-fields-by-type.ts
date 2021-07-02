import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

type FieldType = "String" | "Number" | "Boolean";

const fieldTypeNameIndex = 9;

export const getFieldsByType = (columnMetadata: ColumnMetadata[], typeName: FieldType) =>
  columnMetadata
    .filter(({ type }) => {
      const typeString = type.toString();
      return typeString.slice(fieldTypeNameIndex, typeString.indexOf("(")) === typeName;
    })
    .map(({ propertyName }) => propertyName);
