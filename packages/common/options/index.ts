import { BaseEntity } from "@entitify/core";

export interface Options<T = BaseEntity> {
  take?: number;
  sortBy?: keyof T;
  sortDirection?: "ASC" | "DESC";
  paginate?: boolean;
}

export const defaultOptions: Options = {
  take: 50,
  sortBy: "id",
  sortDirection: "ASC",
  paginate: true
};
