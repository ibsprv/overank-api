import { each, endsWith, toLower } from "lodash";
import { Application } from "express";
import * as routes from "../routes";
import { ROUTER_URLS } from "../config";

const addVersion = (route: string): string => ROUTER_URLS.VERSION1 + route;

const calculateUrl = (name: string): string => {
  const x = toLower(name);
  return endsWith(x, "route") ? addVersion(x.slice(0, -5)) : addVersion(x);
};

export function bindRoutes(app: Application) {
  each(routes, (route, name) => app.use(calculateUrl(name), route));
}
