import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { taskValidator } from "../validators/validators.js";

const router = express.Router();

// Routes for tasks
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", taskValidator, createTask);
router.put("/:id", taskValidator, updateTask);
router.delete("/:id", deleteTask);

export default router;
