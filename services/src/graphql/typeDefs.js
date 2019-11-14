import { gql } from "apollo-server";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar Date

  type Manga {
    id: ID!
    image: String
    lastUpdated: Date!
    title: String!
  }

  type Query {
    mangas: [Manga!]!
  }
`;

export default typeDefs;
