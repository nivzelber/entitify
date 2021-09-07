module.exports = {
  hooks: {
    "pre-commit": "lint-staged",
    "pre-push": "npm run lint:packages -- --fix"
  }
};
