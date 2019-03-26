import { gql } from "apollo-server-express";
import { User } from "../bl";

const typeDef = gql`
  extend type Query {
    userByEmail(email: String!): User!
    userByDNumber(dNumber: String!): User!
  }

  type User {
    name: String!
    givenName: String!
    dNummer: String!
    location: String!
    email: String!
  }
`;

const resolvers = {
  Query: {
    userByEmail: (parent: any, { email }: { email: string }) => {
      const service = new User();
      return service.findByEmail(email);
    },
    userByDNumber: (parent: any, { dNumber }: { dNumber: string }) => {
      const service = new User();
      return service.findByDNummer(dNumber);
    }
  }
};

export const UserSchema = { typeDef, resolvers };
