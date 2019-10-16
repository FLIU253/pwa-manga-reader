import "dotenv/config";

import "./db/connect";
import "./server";

import Manga from "./db/models/Manga";

const manga = new Manga({
  alias: "ouji-no-hakoniwa",
  categories: [],
  hits: 0,
  _id: "5d742c6e719a1606d9325c29",
  image: null,
  status: 1,
  title: "Ouji no Hakoniwa"
});

manga.save(function(err, manga) {
  if (err) return console.error(err);
  console.log("Saved");
});
