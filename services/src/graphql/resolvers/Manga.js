const Manga = {
  id: mangaObj => mangaObj._id,
  info: mangaObj => {},
  lastUpdated: mangaObj => new Date(mangaObj.lastUpdated * 1000)
};

export default Manga;
