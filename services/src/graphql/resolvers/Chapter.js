import { fetchChapterImages } from "../../mangaSources/mangaEden";

const Chapter = {
  images: async chapterObj => {
    const res = await fetchChapterImages({ chapterId: chapterObj.id });
    return res.data.images;
  }
};

export default Chapter;
