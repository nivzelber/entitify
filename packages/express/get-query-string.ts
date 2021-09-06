export const getQueryString = (url: string) => {
  const queryStringIndex = url.indexOf("?");
  const requestHasQueryString = queryStringIndex !== -1;
  return url.slice(requestHasQueryString ? queryStringIndex + 1 : 0);
};
