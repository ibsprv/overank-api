import { gql } from "apollo-server-express";
import { API } from "../config";

const typeDef = gql`
  type Query {
    api: ApiInfo!
  }

  type ApiInfo {
    version: String!
    name: String!
    instance: String!
  }
`;

const resolvers = {
  Query: {
    api: () => API
  }
};

export const ApiSchema = { typeDef, resolvers };
