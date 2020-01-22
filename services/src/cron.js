import "dotenv/config";
import cron from "node-cron";
import Manga from "./db/models/Manga";
import { fetchAllMangas } from "./mangaSources/mangaEden";

import "./db/connect";

const seed = async () => {
  const res = await fetchAllMangas("en");
  const mangas = res.data.manga;

  console.log(`mangas back, got ${mangas.length}`);

  await Manga.insertMany(mangas);

  console.log("seeded");
};

seed();

cron.schedule("0 * * * *", () => {
  console.log("running a task every hour");
});
