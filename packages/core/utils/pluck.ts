export const pluck =
  <T>(key: keyof T) =>
  (value: T) =>
    value[key];
