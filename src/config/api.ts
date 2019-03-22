const pkg = require(`${ __dirname }/../../package.json`);

export const API = {
    name: pkg.name,
    version: pkg.version,
};
