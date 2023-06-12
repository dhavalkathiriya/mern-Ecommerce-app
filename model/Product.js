import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  categories:{
    type: Array,
    required: true,
  },
  size:{
    type: Array,
    required: true,
  },
  img: {
    type: String,
    required: true,
  }
});

export default mongoose.model("products",productSchema );
