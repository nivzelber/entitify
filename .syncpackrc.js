module.exports = {
  dev: true,
  peer: true,
  prod: true,
  filter: ".",
  indent: "  ",
  // TODO: change this to "^"" when a first major version is released
  semverRange: "",
  sortAz: ["dependencies", "devDependencies", "peerDependencies"],
  sortFirst: [
    "name",
    "version",
    "description",
    "author",
    "license",
    "repository",
    "scripts",
    "publishConfig",
    "dependencies",
    "devDependencies",
    "peerDependencies"
  ],
  source: ["package.json", "packages/*/package.json"]
};
