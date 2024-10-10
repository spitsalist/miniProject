import { Post } from "../models/auth.js";
export const postController = async (req, res) => {
  try {
    const posts = req.body;
    if (!posts || posts.length === 0) {
      return res.status(400).json({ message: "No posts provided" });
    }
    const savedPosts = await Post.insertMany(posts);
    res
      .status(201)
      .json({ message: "Post created succesfully", data: savedPosts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating posts", error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server error", error: error.message });
  }
};
