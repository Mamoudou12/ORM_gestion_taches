import { validationResult } from "express-validator";
import Employe from "../models/Employe.js";

export const getAllEmployes = async (req, res) => {
  try {
    const employes = await Employe.findAll();
    res.json(employes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees" });
  }
};

export const getEmployeById = async (req, res) => {
  try {
    const employe = await Employe.findByPk(req.params.id);
    if (employe) {
      res.json(employe);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee" });
  }
};

export const createEmploye = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { first_name, last_name, email, date_embauche, salaire } = req.body;
    const employe = await Employe.create({ first_name, last_name, email, date_embauche, salaire });
    res.status(201).json(employe);
  } catch (error) {
    res.status(500).json({ error: "Error creating employee" });
  }
};

export const updateEmploye = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { first_name, last_name, email, date_embauche, salaire } = req.body;
    const employe = await Employe.findByPk(req.params.id);

    if (employe) {
      employe.first_name = first_name;
      employe.last_name = last_name;
      employe.email = email;
      employe.date_embauche = date_embauche;
      employe.salaire = salaire;
      await employe.save();
      res.json(employe);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating employee" });
  }
};

export const deleteEmploye = async (req, res) => {
  try {
    const employe = await Employe.findByPk(req.params.id);
    if (employe) {
      await employe.destroy();
      res.json({ message: "Employee deleted" });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting employee" });
  }
};
