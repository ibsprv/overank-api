import os from "os";

// tslint:disable-next-line:no-var-requires
const pkg = require(`${__dirname}/../../package.json`);

export const API = {
  name: pkg.name as string,
  version: pkg.version as string,
  instance: os.hostname()
};

export const ROUTER_URLS = {
  VERSION1: "/1/"
};
