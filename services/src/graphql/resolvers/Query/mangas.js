const Manga = require("../../../db/models/Manga");

const mangasResolvers = (context, args) => {
  if (args.searchTitle) {
    console.log(Object.keys(Manga.find({})));
    return Manga.find({ title: new RegExp(args.searchTitle, "i") }).sort({
      hits: -1
    });
  } else if (args.ids) {
    return Manga.find({_id : {$in: args.ids } }).sort({ lastUpdated: -1 });
  }
  else {
    return Manga.find({}).sort({ lastUpdated: -1 });
  }
};

export default mangasResolvers;
