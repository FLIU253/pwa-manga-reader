import * as Query from "./Query";
import Manga from "./Manga";

const resolvers = {
  MangaStatus: {
    COMPLETED: 2,
    ONGOING: 1,
    SUSPENDED: 0
  },
  Manga,
  Query
};

export default resolvers;
