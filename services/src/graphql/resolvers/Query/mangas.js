const Manga = require("../../../db/models/Manga");

const mangasResolvers = () => {
  console.log(Object.keys(Manga.find({})));
  return Manga.find({}).sort({ lastUpdated: -1 });
};

export default mangasResolvers;
