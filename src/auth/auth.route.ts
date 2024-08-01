import { Router } from "express";
import { loginUser } from "./auth.service";

const router = Router();
router.post("/login", loginUser)

export default router;