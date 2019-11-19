import { fetchMangaInfo } from "../../mangaSources/mangaEden";

const Manga = {
  id: mangaObj => mangaObj._id,
  info: async mangaObj => {
    const res = await fetchMangaInfo({ mangaId: mangaObj.id });

    return {
      chapters: res.data.chapters,
      id: mangaObj.id
    };
  },
  lastUpdated: mangaObj => new Date(mangaObj.lastUpdated * 1000)
};

export default Manga;
