import { validationResult } from "express-validator";
import Task from "../models/Task.js";
import Employe from "../models/Employe.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: [Employe] });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: [Employe] });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching task" });
  }
};

export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, description, status, due_date, employeId } = req.body;

    const employe = await Employe.findByPk(employeId);
    if (!employe) {
      return res.status(404).json({ error: "Employe not found" });
    }

    const task = await Task.create({ name, description, status, due_date, employeId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

export const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, description, status, due_date, employeId } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (task) {
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
};

export const deleteTask = async (req, res) => {
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
};
