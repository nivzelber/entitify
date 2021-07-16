import qs from "qs";

import { queryStringValueDecoder } from "./query-string-value-decoder";

export const parseQuery = (query: string | Record<string, string>) =>
  qs.parse(query, {
    decoder: queryStringValueDecoder
  });
