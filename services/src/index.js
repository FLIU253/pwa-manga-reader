require("dotenv").config();

import "./server";
import mongoose from "mongoose";

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const mongooseSchema = new mongoose.Schema({
  alias: String,
  categories: [String],
  hits: Number,
  image: String,
  status: Number,
  title: String
});

const Manga = mongoose.model("Manga", mongooseSchema);

const managa = new Manga({ name: "Zildjian" });
managa.save().then(() => console.log("meow"));
