import express from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import { createPost, getPosts} from "../controllers/postController.js";

const router = express.Router();
// Define your post routes here


router.post('/', authMiddleware, createPost);
router.get('/', authMiddleware, getPosts);


export default router;