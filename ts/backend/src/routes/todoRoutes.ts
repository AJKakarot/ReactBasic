import { Router } from "express";
import * as todoController from "../controllers/todoController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { requireAuth, type AuthedRequest } from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.get("/", (req, res) => {
  todoController.list(req as AuthedRequest, res);
});

router.post("/", (req, res) => {
  todoController.create(req as AuthedRequest, res);
});

router.patch("/:id", (req, res) => {
  todoController.patch(req as unknown as AuthedRequest, res);
});

router.delete("/:id", requireAdmin, (req, res) => {
  todoController.remove(req as AuthedRequest, res);
});

export default router;
