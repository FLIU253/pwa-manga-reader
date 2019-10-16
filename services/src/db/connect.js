import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect("mongodb://fady:fliu253@ds335648.mlab.com:35648/manga-reader", {
  useNewUrlParser: true
});
