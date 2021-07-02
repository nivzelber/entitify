export const queryStringValueDecoder = value => {
  if (/^(\d+|\d*\.\d+)$/.test(value)) {
    return parseFloat(value);
  }

  const keywords = {
    true: true,
    false: false,
    null: null,
    undefined: undefined
  };
  if (value in keywords) {
    return keywords[value];
  }

  return value;
};
