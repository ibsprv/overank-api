import { map, merge, omit } from "lodash";
import { Application } from "express";
import {
  ApolloServer,
  ApolloServerExpressConfig,
  makeExecutableSchema
} from "apollo-server-express";
import * as schemasDefs from "../schemas";
import { GraphQlOptions } from "../config";

const typeDefs = map(schemasDefs, "typeDef");
const resolvers = merge(map(schemasDefs, "resolvers"));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export function initGraphQl(app: Application): void {
  const options: ApolloServerExpressConfig = {
    schema
  };

  const server = new ApolloServer(options);
  server.applyMiddleware({ app, ...GraphQlOptions });
}
