import { Router, Request, Response } from "express";
import { register, login } from "../controllers/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export { router };