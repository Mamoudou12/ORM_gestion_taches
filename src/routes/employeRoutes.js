import express from "express";
import {
  getAllEmployes,
  getEmployeById,
  createEmploye,
  updateEmploye,
  deleteEmploye,
} from "../controllers/employeController.js";
import { employeValidator } from "../validators/validators.js";

const router = express.Router();

// Routes for employees
router.get("/", getAllEmployes);
router.get("/:id", getEmployeById);
router.post("/", employeValidator, createEmploye);
router.put("/:id", employeValidator, updateEmploye);
router.delete("/:id", deleteEmploye);

export default router;
