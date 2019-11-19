import globalAxios from "axios";

export const axios = globalAxios.create({
  baseURL: "https://www.mangaeden.com/api/",
  responseType: "json"
});

const transformChapters = chapters =>
  chapters.map(([number, lastUpdated, title, id]) => ({
    id,
    lastUpdated,
    number,
    title
  }));

const transformMangas = manga =>
  manga
    .filter(manga => manga.ld)
    .map(
      ({
        a: alias,
        c: categories,
        h: hits,
        i: _id,
        im: image,
        s: status,
        t: title,
        ld: lastUpdated
      }) => ({
        alias,
        categories,
        hits,
        _id,
        image,
        status,
        title,
        lastUpdated
      })
    );

export const fetchMangaInfo = ({ mangaId }) => {
  return axios.get(`manga/${mangaId}/`).then(res => {
    res.data.chapters = transformChapters(res.data.chapters);
    return res;
  });
};

export const fetchAllMangas = lang => {
  const langKey = { en: 0 }[lang];
  return axios.get(`list/${langKey}`).then(res => {
    res.data.manga = transformMangas(res.data.manga);
    return res;
  });
};
