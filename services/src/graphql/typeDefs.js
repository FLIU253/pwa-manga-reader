import { gql } from "apollo-server";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  enum MangaStatus {
    COMPLETED
    ONGOING
    SUSPENDED
  }

  scalar Date

  type Chapter {
    id: ID!
    images: [ChapterImage!]!
    lastUpdated: Date!
    number: Float!
    title: String
  }

  type ChapterImage {
    height: Int!
    width: Int!
    url: String!
  }

  type Manga {
    id: ID!
    info: MangaInfo!
    image: String
    lastUpdated: Date!
    status: MangaStatus
    title: String!
  }

  type MangaInfo {
    chapters: [Chapter!]!
    id: ID!
  }

  type Query {
    manga(id: ID!): Manga!
    mangas(searchTitle: String): [Manga!]!
  }
`;

export default typeDefs;
