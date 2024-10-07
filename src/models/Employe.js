import Sequelize from "sequelize";
import sequelize from '../config/db.js'; // Connexion à la base de données

const Employe = sequelize.define("employes", {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,  // Validation pour s'assurer que c'est un e-mail valide
    },
  },
  date_embauche: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  salaire: {
    type: Sequelize.DECIMAL(10, 2),  // Format décimal pour le salaire
    allowNull: false,
  }
}, {
  timestamps: true,  // Ajout des champs createdAt et updatedAt
});

export default Employe;
