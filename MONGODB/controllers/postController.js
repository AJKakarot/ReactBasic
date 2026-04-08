import post from '../models/postModel.js';

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = await post.create({ title, content });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getPosts = async (req, res) => {
    try {
        const posts = await post.find().populate("userId", "name email");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}