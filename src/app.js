import express from "express";
import bodyParser from "body-parser";
import { body, validationResult } from "express-validator";
import Task from "./models/Task.js";
import Employe from "./models/Employe.js";
import sequelize from "./config/db.js";

const app = express();
app.use(bodyParser.json());

// Synchronize the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Unable to sync the database:", error);
  });

// Routes

// GET all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [Employe], // Inclure l'employé associé à chaque tâche
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// GET a task by ID
app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [Employe], // Inclure l'employé associé à la tâche
    });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching task" });
  }
});

// CREATE a new task
app.post(
  "/tasks",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("status").isIn(['pending', 'in_progress', 'completed', 'cancelled']).withMessage("Invalid status"),
    body("due_date").optional().isISO8601().toDate().withMessage("Invalid due date"),
    body("employeId").notEmpty().withMessage("Employe ID is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, description, status, due_date, employeId } = req.body;

      // Vérifier si l'employé existe
      const employe = await Employe.findByPk(employeId);
      if (!employe) {
        return res.status(404).json({ error: "Employe not found" });
      }

      // Créer la tâche
      const task = await Task.create({ name, description, status, due_date, employeId });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Error creating task" });
    }
  }
);

// UPDATE a task by ID
app.put(
  "/tasks/:id",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("status").isIn(['pending', 'in_progress', 'completed', 'cancelled']).withMessage("Invalid status"),
    body("due_date").optional().isISO8601().toDate().withMessage("Invalid due date"),
    body("employeId").optional().notEmpty().withMessage("Employe ID is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, description, status, due_date, employeId } = req.body;
      const task = await Task.findByPk(req.params.id);

      if (task) {
        // Vérifier si l'employé existe, si un employeId est fourni
        if (employeId) {
          const employe = await Employe.findByPk(employeId);
          if (!employe) {
            return res.status(404).json({ error: "Employe not found" });
          }
          task.employeId = employeId;
        }

        task.name = name;
        task.description = description;
        task.status = status;
        task.due_date = due_date;
        await task.save();

        res.json(task);
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating task" });
    }
  }
);

// DELETE a task by ID
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.json({ message: "Task deleted" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

// Start the server
const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
