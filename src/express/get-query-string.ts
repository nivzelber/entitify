import qs from "qs";

import { queryStringValueDecoder } from "../utils/query-string-value-decoder";

export const getQueryString = (url: string) => {
  const queryStringIndex = url.indexOf("?");
  const requestHasQueryString = queryStringIndex !== -1;
  const rawQueryString = url.slice(requestHasQueryString ? queryStringIndex + 1 : 0);

  const queryString = qs.parse(rawQueryString, {
    decoder: queryStringValueDecoder
  });

  return queryString;
};
