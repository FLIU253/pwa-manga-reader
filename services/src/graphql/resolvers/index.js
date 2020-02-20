import * as Query from "./Query";
import Manga from "./Manga";
import Chapter from "./Chapter";

const resolvers = {
  Chapter,
  MangaStatus: {
    COMPLETED: 2,
    ONGOING: 1,
    SUSPENDED: 0
  },
  Manga,
  Query
};

export default resolvers;
