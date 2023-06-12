import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    admin:{
    type:Boolean,
    default:false
    }
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
