import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});
export const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model("Post", postSchema);
