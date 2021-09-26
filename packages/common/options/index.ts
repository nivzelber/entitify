import { BaseEntity } from "../types";

export interface Options<T = BaseEntity> {
  sortBy?: keyof T;
  sortDirection?: "ASC" | "DESC";
  paginate?: boolean;
  take?: number;
  cache?: number;
}

export const defaultOptions: Options = {
  sortBy: "id",
  paginate: true,
  sortDirection: "ASC",
  take: 50
};
