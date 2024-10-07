import express from "express";
import bodyParser from "body-parser";
import sequelize from "./config/db.js";
import employeRoutes from "./routes/employeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(bodyParser.json());

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Unable to sync the database:", error);
  });

app.use("/employes", employeRoutes);
app.use("/tasks", taskRoutes);

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
