import Sequelize from "sequelize";
import sequelize from '../config/db.js';
import Employe from './Employe.js';  // Importer le modèle Employe

const Task = sequelize.define("tasks", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,  // Utilisation de TEXT au lieu de STRING pour les longues descriptions
  },
  status: {
    type: Sequelize.ENUM('pending', 'in_progress', 'completed', 'cancelled'),  // Ajout de plusieurs statuts pour plus de flexibilité
    defaultValue: 'pending',
  },
  due_date: {
    type: Sequelize.DATE,
    allowNull: true,  // La date d'échéance peut être vide au début
  },
}, {
  timestamps: true,  // Ajout des timestamps createdAt et updatedAt
});

// Relation : Un employé peut avoir plusieurs tâches (One-to-Many)
Task.belongsTo(Employe, {
  foreignKey: {
    name: 'employeId',
    allowNull: false,  // Chaque tâche doit être assignée à un employé
  },
  onDelete: 'CASCADE',  // Si un employé est supprimé, ses tâches le seront aussi
});

export default Task;
