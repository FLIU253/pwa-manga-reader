import axios from "axios";
import "dotenv/config";
import cron from "node-cron";
import Manga from "./db/models/Manga";

import "./db/connect";

const axiosME = axios.create({
  baseURL: "https://www.mangaeden.com/api/list/0",
  responseType: "json"
});

const transformMangaEden = manga =>
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

const seed = async () => {
  const res = await axiosME.get();
  const mangas = transformMangaEden(res.data.manga);

  console.log(`mangas back, got ${mangas.length}`);

  Manga.insertMany(mangas);

  console.log("seeded");
};

seed();

cron.schedule("0 * * * *", () => {
  console.log("running a task every hour");
});
