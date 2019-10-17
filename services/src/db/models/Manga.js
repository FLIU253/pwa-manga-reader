import mongoose from "mongoose";

export const schema = new mongoose.Schema({
  alias: String,
  categories: [String],
  hits: Number,
  image: String,
  status: Number,
  title: String,
  lastUpdated: Number
});

const Manga = mongoose.model("Manga", schema);

export default Manga;
