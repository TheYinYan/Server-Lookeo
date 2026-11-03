import { Router } from "express";
import { registerCtrl, loginCtrl } from "./auth.controller.js";
import { registerSchema, loginSchema } from "../users/users.schema.js";

const router = Router();

router.post("/register", (req, res, next) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.issues });
  next();
}, registerCtrl);

router.post("/login", (req, res, next) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.issues });
  next();
}, loginCtrl);

export default router;