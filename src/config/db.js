import Sequelize from "sequelize";

const sequelize = new Sequelize("gestion_taches", "test_user", "password123", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate().then(() => {
  console.log("connexion reuissi");
});

export default sequelize
