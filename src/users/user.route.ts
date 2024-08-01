import { Router } from "express";
import { createUser, getAllUsers } from "./user.service";
import { isAdmin, isLoggedIn } from "../middleware/auth";

const router = Router();
router.post("/create-user", createUser)
router.get("/all-users", [isLoggedIn, isAdmin], getAllUsers)

export default router;