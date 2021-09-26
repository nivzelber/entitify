import { BaseEntity, Options } from "@entitify/common";
import { FindManyOptions, FindOneOptions } from "typeorm";

import { OneOrMany } from "../../types/one-or-may.type";

export interface GetQueryOptionsProps<T extends BaseEntity> {
  options: Options;
  initialQueryOptions: FindOneOptions<T> | FindManyOptions<T>;
}

type OneOrManyQueryOptions<
  TOneOrMany extends OneOrMany,
  TEntity extends BaseEntity
> = TOneOrMany extends "one" ? FindOneOptions<TEntity> : FindManyOptions<TEntity>;

export const getQueryOptions = <
  TOneOrMany extends OneOrMany,
  TEntity extends BaseEntity = BaseEntity
>({
  options,
  initialQueryOptions = {}
}: GetQueryOptionsProps<TEntity>): OneOrManyQueryOptions<TOneOrMany, TEntity> => {
  const queryOptions: OneOrManyQueryOptions<TOneOrMany, TEntity> = { ...initialQueryOptions };
  if (options.cache) {
    queryOptions.cache = options.cache;
  }

  return queryOptions;
};
