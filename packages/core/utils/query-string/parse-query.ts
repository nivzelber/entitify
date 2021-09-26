import qs, { ParsedQs } from "qs";

import { queryStringValueDecoder } from "./query-string-value-decoder";

export const parseQuery = (query: string | Record<string, string>): ParsedQs =>
  qs.parse(query, {
    decoder: queryStringValueDecoder
  }) as ParsedQs;
