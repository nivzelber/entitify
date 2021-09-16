export interface Options {
  take?: number;
  // TODO: add a default sort by field, default for paginate
}

export const defaultOptions: Options = { take: 50 };
