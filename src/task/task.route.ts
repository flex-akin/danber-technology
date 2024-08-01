import { Router } from "express";
import { createTask, deleteTask, filterTaskByStatus, getAllTask, getUserTask, updateTask } from "./task.service";
import { isAdmin, isLoggedIn } from "../middleware/auth";

const router = Router();
router.post("/create-task", [isLoggedIn], createTask)
router.get("/get-user-task", [isLoggedIn], getUserTask)
router.put("/update-user-task/:id", [isLoggedIn], updateTask)
router.delete("/delete-user-task/:id", [isLoggedIn], deleteTask)
router.get("/get-all-task", [isLoggedIn, isAdmin], getAllTask)
router.get("/filter-by-status", [isLoggedIn, isAdmin], filterTaskByStatus)

export default router; 