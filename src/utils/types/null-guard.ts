export const nullGuard = <T>(value: T | undefined | null): value is T => Boolean(value);
