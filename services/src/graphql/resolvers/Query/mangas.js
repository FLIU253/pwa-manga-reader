const Manga = require("../../../db/models/Manga");

const mangasResolvers = () => {
  console.log(Object.keys(Manga.find({})));
  return Manga.find({}).sort({ lastUpdated: -1 });
  // return [
  //   {
  //     id: "1",
  //     image: "kitten.jpg",
  //     title: "One Piece"
  //   },
  //   {
  //     id: "2",
  //     image: "kitten2.jpg",
  //     title: "Two Piece"
  //   }
  // ];
};

export default mangasResolvers;
