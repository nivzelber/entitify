import { Options } from "@entitify/common";
import { FindConditions, FindManyOptions } from "typeorm";
import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";

import { BaseEntity, FieldNameTypeTuple } from "../../types";
import { parseQuery } from "../../utils";
import { getWhereConditions } from "../conditions";

import { getQueryOptions } from "./get-query-options";

type FindOptionsOrder<TEntity> = {
  [P in EntityFieldsNames<TEntity>]?: "ASC" | "DESC" | 1 | -1;
};

export interface GetConditionedQueryOptionsProps {
  queryString: string;
  options: Options;
  fields: FieldNameTypeTuple[];
}

export const getConditionedQueryOptions = <TEntity extends BaseEntity = BaseEntity>({
  queryString,
  options,
  fields
}: GetConditionedQueryOptionsProps) => {
  const parsedQuery = parseQuery(queryString);

  const {
    _take = options.take,
    _skip = 0,
    paginate = options.paginate,
    _and = false,
    _sort_by = options.sortBy,
    _sort_direction = options.sortDirection
  } = parsedQuery;

  const conditions: FindConditions<TEntity>[] = getWhereConditions({
    query: parsedQuery,
    fields,
    and: _and as boolean
  });

  const queryOptions: FindManyOptions<TEntity> = {
    where: conditions,
    order: {
      [_sort_by as string]: (_sort_direction as string).toUpperCase()
    } as FindOptionsOrder<TEntity>
  };

  if (paginate) {
    queryOptions.take = _take as number;
    queryOptions.skip = _skip as number;
  }

  const extendedQueryOptions = getQueryOptions<"many", TEntity>({
    options,
    initialQueryOptions: queryOptions
  });

  return extendedQueryOptions;
};
