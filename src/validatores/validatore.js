import { body } from "express-validator";

// Validator for employees
const employeValidator = [
  body("first_name").notEmpty().withMessage("First name is required"),
  body("last_name").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("date_embauche").isISO8601().toDate().withMessage("Invalid hire date"),
  body("salaire").isDecimal().withMessage("Salary must be a valid decimal"),
];

// Validator for tasks
const taskValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("status")
    .isIn(["pending", "in_progress", "completed", "cancelled"])
    .withMessage("Invalid status"),
  body("due_date")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid due date"),
  body("employeId").notEmpty().withMessage("Employe ID is required"),
];

export { employeValidator, taskValidator };
