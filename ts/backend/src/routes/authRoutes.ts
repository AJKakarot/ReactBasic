import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

router.post("/signup", (req, res, next) => {
  void authController.signup(req, res).catch(next);
});

router.post("/login", (req, res, next) => {
  void authController.login(req, res).catch(next);
});

export default router;
