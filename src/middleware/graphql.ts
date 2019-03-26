import { Application } from "express";
import { ApolloServer, ApolloServerExpressConfig } from "apollo-server-express";
import { Test } from "../schemas";
import { GraphQlOptions } from "../config";

export function initGraphQl(app: Application): void {
  const options: ApolloServerExpressConfig = {
    typeDefs: Test.schema,
    resolvers: Test.resolvers
  };
  const server = new ApolloServer(options);

  server.applyMiddleware({ app, ...GraphQlOptions });
}
