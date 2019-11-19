import Manga from "../../../db/models/Manga";

const mangaResolvers = (context, args) => {
  return Manga.findById(args.id);
};

export default mangaResolvers;
